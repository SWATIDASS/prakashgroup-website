import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Careers API POST body:', body);
    const { name, email, phone, position, message, fileKey, fileUrl } = body as {
      name?: string;
      email?: string;
      phone?: string;
      position?: string;
      message?: string;
      fileKey?: string;
      fileUrl?: string;
    };

    if (!name || !email || !fileKey || !fileUrl) {
      return NextResponse.json({ error: 'Missing required fields (name, email, file)' }, { status: 400 });
    }

    // Email config
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;
    const to = process.env.CAREERS_EMAIL || process.env.SUPPORT_EMAIL || 'swati.das1506@gmail.com';

    let transporter;
    let previewUrl: string | undefined = undefined;

    if (!host || !user || !pass) {
      // No SMTP configured; create an Ethereal test account for dev testing
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
    } else {
      transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
    }

    const subject = `New career application: ${position || 'Unspecified'}`;
    const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || ''}\nPosition: ${position || ''}\n\nMessage:\n${message || ''}\n\nFile: ${fileUrl}`;

    const info = await transporter.sendMail({ from, to, subject, text });

    const testPreview = nodemailer.getTestMessageUrl(info);
    if (testPreview) previewUrl = testPreview;

    return NextResponse.json({ ok: true, previewUrl });
  } catch (err) {
    console.error('Careers API error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
