const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Direct service name use karein
      auth: {
        user: process.env.MAIL_USER, // Aapki Gmail ID
        pass: process.env.MAIL_PASS, // 16-digit App Password
      },
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