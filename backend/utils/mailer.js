const nodemailer = require('nodemailer');

// EMAIL_USER/EMAIL_APP_PASSWORD .env-এ না দিলেও app বন্ধ হবে না —
// code সবসময় terminal-এ ছাপা হবে, যাতে email setup ছাড়াই test করা যায়।
async function sendVerificationCode(toEmail, code) {
  console.log(`\n📧 Verification code for ${toEmail}: ${code}\n`);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.log('(Email পাঠানো হয়নি — .env-এ EMAIL_USER/EMAIL_APP_PASSWORD দাওনি, উপরের code দিয়েই verify করো)');
    return { sent: false };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"Porshi" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'তোমার Porshi verification code',
      text: `তোমার verification code: ${code}\n\n১০ মিনিটের মধ্যে ব্যবহার করো।`
    });

    return { sent: true };
  } catch (err) {
    console.log('Email পাঠাতে সমস্যা হয়েছে, কিন্তু code উপরে console-এ আছে:', err.message);
    return { sent: false };
  }
}

module.exports = { sendVerificationCode };
