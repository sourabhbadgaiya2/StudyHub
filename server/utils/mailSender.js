import { Resend } from "resend";

// Initialize Resend with API key from environment variable
const resend = new Resend("re_Tg3MrZA7_F82oqkKiL5yWSQude5rkQAiz");

const mailSender = async (email, title, body) => {
  try {
    const data = await resend.emails.send({
      from: "StudyNotion <sourabhbadgaiya2@gmail.com>", // You can customize sender name & email
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent:", data.id);
    return data;
  } catch (error) {
    console.error("Mail send error:", error);
    return null;
  }
};

export default mailSender;