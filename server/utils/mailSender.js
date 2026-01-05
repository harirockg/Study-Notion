const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,        // smtp.gmail.com
      port: 587,                          // 🔥 REQUIRED
      secure: false,                      // 🔥 REQUIRED (true only for 465)
      auth: {
        user: process.env.MAIL_USER,      // your gmail
        pass: process.env.MAIL_PASS,      // app password
      },
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Mail Sender Error:", error.message);
    throw error; // 🔥 IMPORTANT
  }
};

module.exports = mailSender;
