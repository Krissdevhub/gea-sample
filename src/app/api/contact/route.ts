import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, mobile, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Please provide name, email, and message.' }, { status: 400 });
    }

    await db.contactEnquiry.create({
      data: {
        name,
        email,
        mobile: mobile || '',
        subject: subject || 'General Enquiry',
        message,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Contact enquiry error:', err);
    return NextResponse.json({ error: 'Failed to record enquiry.' }, { status: 500 });
  }
}
