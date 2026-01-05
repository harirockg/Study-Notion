const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // TLS ke liye false hi rahega
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      // Ye settings timeout issue solve karne ke liye hain
      tls: {
        rejectUnauthorized: false, // Security handshake ko asan banata hai
      },
      connectionTimeout: 20000, // Timeout badha kar 20 seconds kar diya
      greetingTimeout: 15000,
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