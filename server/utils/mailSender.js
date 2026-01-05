const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Gmail service use kar rahe hain
      auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS, 
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