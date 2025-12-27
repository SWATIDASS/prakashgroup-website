import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, position, message, fileKey, fileUrl, fileName, fileData, contentType } = body as {
      name?: string;
      email?: string;
      phone?: string;
      position?: string;
      message?: string;
      fileKey?: string;
      fileUrl?: string;
      // fallback file upload
      fileName?: string;
      fileData?: string; // base64
      contentType?: string;
    };

    // Require name & email and either S3-supplied file keys or a fallback file payload
    if (!name || !email || (!(fileKey && fileUrl) && !(fileName && fileData))) {
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

    // Build email body and attachments. Prefer S3 fileUrl when available, otherwise attach file bytes from fallback
    let text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || ''}\nPosition: ${position || ''}\n\nMessage:\n${message || ''}`;
    const attachments: { filename: string; content: Buffer; contentType?: string }[] = [];
    if (fileUrl) {
      text += `\n\nFile: ${fileUrl}`;
    } else if (fileName && fileData) {
      text += `\n\nFile attached: ${fileName}`;
      attachments.push({ filename: fileName, content: Buffer.from(fileData, 'base64'), contentType: contentType || undefined });
    }

    const info = await transporter.sendMail({ from, to, subject, text, attachments });

    const testPreview = nodemailer.getTestMessageUrl(info);
    if (testPreview) previewUrl = testPreview;

    return NextResponse.json({ ok: true, previewUrl });
  } catch (err) {
    console.error('Careers API error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
