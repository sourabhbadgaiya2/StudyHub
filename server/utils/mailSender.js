  const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    console.log("📨 Preparing to send email...");

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // smtp.gmail.com
      port: 587,                   // TLS port
      secure: false,               // false for port 587
      auth: {
        user: process.env.MAIL_USER, // your Gmail address
        pass: process.env.MAIL_PASS, // your Gmail App Password
      },
      connectionTimeout: 10000, // 10 seconds max wait for connection
      greetingTimeout: 10000,   // timeout for initial greeting
      socketTimeout: 20000,     // total time before giving up
      tls: {
        rejectUnauthorized: false, // helps avoid some Gmail SSL issues
      },
    });

    console.log("📡 Connected to mail server, sending message...");

    let info = await transporter.sendMail({
      from: `"Study Hub" <${process.env.MAIL_USER}>`, // must match MAIL_USER
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Email sent successfully:", info.response);
    return info;

  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
    if (error.code === 'ETIMEDOUT') {
      console.log("⚠️ Connection timed out — Gmail server not responding.");
    }
    if (error.response) {
      console.log("📭 SMTP Response:", error.response);
    }
  }
};

module.exports = mailSender;
