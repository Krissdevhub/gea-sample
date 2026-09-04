import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { verifyPaymentSignature } from '@/lib/razorpay';
import { generateMembershipNumber, generateReceiptNumber } from '@/lib/id-generator';
import { sendEmail, getMembershipActivatedEmail } from '@/lib/mailer';
import { logAuditEvent } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.memberId) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing required payment verification tokens.' }, { status: 400 });
    }

    const isValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid payment signature. Payment rejected.' }, { status: 400 });
    }

    const payment = await db.payment.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
      include: { member: { include: { user: true, department: true, district: true } } },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment transaction record not found.' }, { status: 404 });
    }

    if (payment.status === 'SUCCESS') {
      return NextResponse.json({ success: true, message: 'Payment already processed.' });
    }

    // Generate unique sequential membership number and receipt number
    const membershipNumber = payment.member.membershipNumber || (await generateMembershipNumber());
    const receiptNumber = await generateReceiptNumber();

    // Transactional activation
    await db.$transaction([
      // 1. Update Payment
      db.payment.update({
        where: { id: payment.id },
        data: {
          status: 'SUCCESS',
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
      }),

      // 2. Activate Member & issue number
      db.member.update({
        where: { id: payment.memberId },
        data: {
          status: 'ACTIVE',
          membershipNumber,
          cardIssuedAt: new Date(),
          qrCodeHash: `mpgea_qr_${membershipNumber.replace(/\//g, '_')}`,
        },
      }),

      // 3. Create active Membership term
      db.membership.create({
        data: {
          memberId: payment.memberId,
          typeId: 'SERVING_ANNUAL',
          startDate: new Date(),
          endDate: new Date(Date.now() + 365 * 24 * 3600 * 1000),
          status: 'ACTIVE',
          amountPaid: payment.amount,
        },
      }),

      // 4. Generate Official Receipt
      db.receipt.create({
        data: {
          receiptNumber,
          paymentId: payment.id,
          memberId: payment.memberId,
          amount: payment.amount,
          receiptData: JSON.stringify({
            memberName: payment.member.fullName,
            membershipNumber,
            designation: payment.member.designation,
            department: payment.member.department.name,
            district: payment.member.district.name,
            transactionId: razorpay_payment_id,
            feeType: 'Annual Serving Engineer Subscription',
            date: new Date().toISOString(),
          }),
        },
      }),
    ]);

    // Send Activation Email
    const emailData = getMembershipActivatedEmail(payment.member.fullName, membershipNumber);
    await sendEmail({
      to: payment.member.user.email,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    });

    await logAuditEvent({
      actorId: session.id,
      action: 'MEMBERSHIP_PAYMENT_ACTIVATED',
      entityType: 'Member',
      entityId: payment.memberId,
      metadata: { membershipNumber, receiptNumber, amount: payment.amount },
    });

    return NextResponse.json({
      success: true,
      membershipNumber,
      receiptNumber,
    });
  } catch (err: any) {
    console.error('Payment verification error:', err);
    return NextResponse.json({ error: err.message || 'Payment activation failed.' }, { status: 500 });
  }
}
