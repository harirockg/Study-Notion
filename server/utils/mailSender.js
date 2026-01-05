const axios = require("axios");

const mailSender = async (email, title, body) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "StudyNotion", email: process.env.MAIL_USER },
        to: [{ email: email }],
        subject: title,
        htmlContent: body,
      },
      {
        headers: {
          "api-key": process.env.MAIL_PASS, // Aapki lambi Brevo API Key
          "Content-Type": "application/json",
        },
      }
    );

    console.log("EMAIL SENT SUCCESSFULLY via API:", response.data.messageId);
    return response.data;
  } catch (error) {
    console.error("MAIL SENDER ERROR (API):", error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = mailSender;