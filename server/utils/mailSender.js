const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false, // Brevo = false
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion" <no-reply@studynotion.com>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("EMAIL SENT:", info.messageId);
    return info;
  } catch (error) {
    console.error("MAIL ERROR:", error);
    throw error;
  }
};

module.exports = mailSender;
