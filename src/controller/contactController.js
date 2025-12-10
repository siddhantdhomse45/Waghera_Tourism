import { sendEmailWithAttachment } from "../services/emailService.js";

export const sendContactMail = async (req, res) => {
  const { name, email, message } = req.body;

  const emailSent = await sendEmail(
    "langheps2003@example.com",
    "New Contact Form Message",
    `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
  );

  if (emailSent) {
    return res.status(200).json({ success: true, message: "Email sent!" });
  } else {
    return res.status(500).json({ success: false, message: "Email failed!" });
  }
};
