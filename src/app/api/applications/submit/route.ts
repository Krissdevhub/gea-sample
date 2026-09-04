import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, createSessionToken, setSessionCookie } from '@/lib/auth';
import { savePrivateFile } from '@/lib/storage';
import { sendEmail, getApplicationReceivedEmail } from '@/lib/mailer';
import { logAuditEvent } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const mobile = formData.get('mobile') as string;
    const password = formData.get('password') as string;
    const gender = formData.get('gender') as string;
    const dob = formData.get('dob') as string;
    const employeeId = formData.get('employeeId') as string;
    const departmentId = formData.get('departmentId') as string;
    const designation = formData.get('designation') as string;
    const branchId = formData.get('branchId') as string;
    const qualification = formData.get('qualification') as string;
    const postingDistrictId = formData.get('postingDistrictId') as string;
    const postingOffice = formData.get('postingOffice') as string;
    const dateOfJoining = formData.get('dateOfJoining') as string;

    const proofFile = formData.get('proofDocument') as File;
    const photoFile = formData.get('photo') as File | null;

    if (!fullName || !email || !mobile || !password || !employeeId || !departmentId || !designation || !branchId || !postingDistrictId || !proofFile) {
      return NextResponse.json({ error: 'Please provide all mandatory personal, professional, and proof fields.' }, { status: 400 });
    }

    // Check existing email or mobile
    const existingUser = await db.user.findFirst({
      where: { OR: [{ email }, { mobile }] },
    });
    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email or mobile number already exists.' }, { status: 409 });
    }

    // Save proof document securely
    const proofBytes = Buffer.from(await proofFile.arrayBuffer());
    const storedProof = await savePrivateFile(proofBytes, proofFile.name, proofFile.type);

    // Optional photo
    let photoUrl = null;
    if (photoFile && photoFile.size > 0) {
      const photoBytes = Buffer.from(await photoFile.arrayBuffer());
      const storedPhoto = await savePrivateFile(photoBytes, photoFile.name, photoFile.type);
      photoUrl = storedPhoto.relativePath;
    }

    // Create User, Member Profile, Role, Application, Document in a single transaction
    const hashedPassword = await hashPassword(password);

    const user = await db.user.create({
      data: {
        email,
        mobile,
        passwordHash: hashedPassword,
        status: 'ACTIVE',
        roles: {
          create: [{ roleId: 'MEMBER' }],
        },
        member: {
          create: {
            fullName,
            gender: gender || null,
            dob: dob || null,
            photoUrl,
            employeeId,
            organisation: 'Madhya Pradesh State Government',
            departmentId,
            designation,
            branchId,
            qualification,
            postingDistrictId,
            postingOffice: postingOffice || null,
            dateOfJoining,
            status: 'SUBMITTED',
            applications: {
              create: {
                status: 'SUBMITTED',
                adminNotes: 'Application submitted online awaiting scrutiny.',
              },
            },
            documents: {
              create: {
                documentType: 'DEPARTMENT_ID',
                originalFilename: proofFile.name,
                storedPath: storedProof.storedFilename,
                mimeType: storedProof.mimeType,
                fileSize: storedProof.size,
                isVerified: false,
              },
            },
          },
        },
      },
      include: {
        member: true,
        roles: true,
      },
    });

    const token = createSessionToken({
      id: user.id,
      email: user.email,
      mobile: user.mobile,
      roles: ['MEMBER'],
      memberId: user.member?.id,
      memberName: user.member?.fullName,
      membershipNumber: null,
      membershipStatus: 'SUBMITTED',
    });
    await setSessionCookie(token);

    // Send acknowledgement email
    const emailData = getApplicationReceivedEmail(fullName, user.member?.id || user.id);
    await sendEmail({
      to: email,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    });

    await logAuditEvent({
      actorId: user.id,
      action: 'MEMBERSHIP_APPLICATION_SUBMITTED',
      entityType: 'Member',
      entityId: user.member?.id || user.id,
      metadata: { departmentId, designation, branchId },
    });

    return NextResponse.json({
      success: true,
      memberId: user.member?.id,
      redirectUrl: '/portal/dashboard',
    });
  } catch (err: any) {
    console.error('Application submission error:', err);
    return NextResponse.json({ error: err.message || 'Submission failed.' }, { status: 500 });
  }
}
