const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com", // Direct name likhein
      port: 587,
      secure: false, // 587 port ke liye false
      auth: {
        user: process.env.MAIL_USER, // Yahan apni asli Gmail ID Render mein daalein
        pass: process.env.MAIL_PASS,
      },
      // Ye line DNS issue solve karne ke liye zaroori hai
      connectionTimeout: 10000, 
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
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