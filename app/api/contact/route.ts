import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, message } = body as { name?: string; phone?: string; message?: string };

    if (!name || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Require SMTP env vars
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;
    const to = process.env.SUPPORT_EMAIL || 'swati.das1506@gmail.com';

    let transporter;
    let previewUrl: string | undefined = undefined;

    if (!host || !user || !pass) {
      // No SMTP configured; create an Ethereal test account to verify sending in dev
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

    const subject = `Support request from ${name}`;
    const text = `Name: ${name}\nPhone: ${phone}\n\nMessage:\n${message}`;

    const info = await transporter.sendMail({ from, to, subject, text });

    // If using Ethereal, return a preview URL so the developer can view the message
    const testPreview = nodemailer.getTestMessageUrl(info);
    if (testPreview) previewUrl = testPreview;

    return NextResponse.json({ ok: true, previewUrl });
  } catch (err) {
    console.error('Contact API error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
