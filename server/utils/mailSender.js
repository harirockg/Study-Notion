const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL ka use karein
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      // Timeout ko thoda badha dete hain
      connectionTimeout: 10000, 
    });

    console.log("Attempting to send email to:", email);

    let info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log("EMAIL SENT SUCCESSFULLY:", info.messageId);
    return info;
  } catch (error) {
    console.error("MAIL SENDER ERROR:", error.message);
    // Yahan throw error zaroori hai taaki frontend ko pata chale fail hua hai
    throw error; 
  }
};

module.exports = mailSender;