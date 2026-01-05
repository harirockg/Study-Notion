const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // Brevo settings ke liye configuration
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // smtp-relay.brevo.com
      port: 587,                   // Brevo standard port
      secure: false,               // 587 ke liye false hi rahega
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`, // Brevo par registered email hi use karein
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log("EMAIL SENT SUCCESSFULLY:", info.messageId);
    return info;
  } catch (error) {
    console.error("MAIL SENDER ERROR:", error.message);
    throw error;
  }
};

module.exports = mailSender;