import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'noreply@mpgea.org',
    pass: process.env.SMTP_PASS || 'mock_smtp_password',
  },
});

export interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  const from = process.env.SMTP_FROM || 'MP-GEA Official <noreply@mpgea.org>';

  // Log transactional email for audit and fallback in development/test
  console.log(`[EMAIL NOTIFICATION TO: ${options.to}] SUBJECT: ${options.subject}`);

  try {
    if (process.env.NODE_ENV === 'production' && process.env.SMTP_PASS !== 'mock_smtp_password') {
      await transporter.sendMail({
        from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });
    }
    return true;
  } catch (err) {
    console.error('SMTP email dispatch error:', err);
    return false;
  }
}

export function getApplicationReceivedEmail(name: string, appId: string): { subject: string; text: string; html: string } {
  return {
    subject: 'MP-GEA Membership Application Received',
    text: `Dear ${name}, your application for MP-GEA membership has been received successfully (ID: ${appId}). It is under administrative review.`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0A2540;">Madhya Pradesh Government Engineers’ Association</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for applying to join MP-GEA. Your application has been received and registered under Reference ID: <code>${appId}</code>.</p>
        <p>Our membership scrutiny committee is reviewing your uploaded departmental service documents. You will receive an update once verified.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #64748b; font-size: 12px;">MP-GEA Digital Office, Nirman Bhawan, Bhopal (M.P.)</p>
      </div>
    `,
  };
}

export function getCorrectionRequiredEmail(name: string, reason: string): { subject: string; text: string; html: string } {
  return {
    subject: 'Action Required: MP-GEA Application Correction Requested',
    text: `Dear ${name}, your MP-GEA application requires correction: ${reason}. Please log into your member portal to update.`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f59e0b; border-radius: 8px;">
        <h2 style="color: #b45309;">Application Correction Required</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>During scrutiny of your membership application, the verification officer requested the following correction:</p>
        <div style="background: #fef3c7; padding: 12px; border-left: 4px solid #f59e0b; margin: 15px 0;">
          <strong>Officer Note:</strong> ${reason}
        </div>
        <p>Please log in to your MP-GEA account to update your details or re-upload the required departmental service proof.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #64748b; font-size: 12px;">MP-GEA Digital Office, Nirman Bhawan, Bhopal (M.P.)</p>
      </div>
    `,
  };
}

export function getApprovalEmail(name: string, amount: number): { subject: string; text: string; html: string } {
  return {
    subject: 'Congratulations: MP-GEA Membership Approved (Payment Pending)',
    text: `Dear ${name}, your service credentials have been verified and approved. Please complete your subscription fee payment of ₹${amount} to activate your digital ID.`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #10b981; border-radius: 8px;">
        <h2 style="color: #047857;">Membership Application Approved!</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Your government engineering service credentials have been verified by the Membership Scrutiny Committee.</p>
        <p>To finalize your enrollment and activate your official <strong>Digital Membership ID Card</strong>, please complete your annual subscription payment of <strong>₹${amount}</strong>.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #64748b; font-size: 12px;">MP-GEA Digital Office, Nirman Bhawan, Bhopal (M.P.)</p>
      </div>
    `,
  };
}

export function getMembershipActivatedEmail(name: string, memNumber: string): { subject: string; text: string; html: string } {
  return {
    subject: 'Welcome to MP-GEA: Membership Activated',
    text: `Dear ${name}, your MP-GEA membership is now ACTIVE. Your Membership Number is ${memNumber}.`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #0d9488; border-radius: 8px;">
        <h2 style="color: #0f766e;">Welcome to MP-GEA</h2>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Your membership payment has been confirmed. Your membership is now <strong>ACTIVE</strong>.</p>
        <div style="background: #f0fdfa; padding: 15px; border-radius: 6px; margin: 15px 0; text-align: center;">
          <div style="font-size: 12px; color: #0d9488; text-transform: uppercase; font-weight: bold;">Official Membership Number</div>
          <div style="font-size: 24px; font-weight: bold; color: #0f766e; margin-top: 5px;">${memNumber}</div>
        </div>
        <p>You can now download your official <strong>Digital ID Card with verification QR code</strong>, access protected government circulars, and file representations in the Member Portal.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #64748b; font-size: 12px;">MP-GEA Digital Office, Nirman Bhawan, Bhopal (M.P.)</p>
      </div>
    `,
  };
}
