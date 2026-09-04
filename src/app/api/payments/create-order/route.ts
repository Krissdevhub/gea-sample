import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { createRazorpayOrder } from '@/lib/razorpay';
import { generateReceiptNumber } from '@/lib/id-generator';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.memberId) {
      return NextResponse.json({ error: 'Unauthorized: please sign in as member.' }, { status: 401 });
    }

    const { typeId = 'SERVING_ANNUAL' } = await req.json();

    const memberType = await db.membershipType.findUnique({
      where: { id: typeId },
    });
    if (!memberType) {
      return NextResponse.json({ error: 'Invalid membership subscription plan selected.' }, { status: 400 });
    }

    const receiptNo = await generateReceiptNumber();

    const order = await createRazorpayOrder({
      amount: memberType.feeAmount,
      currency: 'INR',
      receipt: receiptNo,
      notes: {
        memberId: session.memberId,
        typeId: memberType.id,
      },
    });

    // Record pending payment in DB
    await db.payment.create({
      data: {
        memberId: session.memberId,
        amount: memberType.feeAmount,
        currency: 'INR',
        razorpayOrderId: order.id,
        status: 'PENDING',
        purpose: 'NEW_MEMBERSHIP',
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_mpgea_mock_key',
      memberName: session.memberName,
      memberEmail: session.email,
    });
  } catch (err: any) {
    console.error('Order creation error:', err);
    return NextResponse.json({ error: err.message || 'Payment initiation failed.' }, { status: 500 });
  }
}
