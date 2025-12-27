import nodemailer from 'nodemailer';

async function main() {
  console.log('Creating test account...');
  const testAccount = await nodemailer.createTestAccount();
  console.log('Test account', testAccount.smtp);

  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });

  const info = await transporter.sendMail({
    from: testAccount.user,
    to: testAccount.user,
    subject: 'Nodemailer test',
    text: 'hello',
  });

  console.log('Sent', info);
  const preview = nodemailer.getTestMessageUrl(info);
  console.log('Preview URL', preview);
}

main().catch((e)=>{console.error('ERR',e);process.exit(1)})
