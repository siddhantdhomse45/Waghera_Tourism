// import nodemailer from "nodemailer";

// // Configure transporter
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com", // Gmail SMTP
//   port: 465,
//   secure: true, // SSL
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Google App Password
//   },
// });

// /**
//  * Send a simple HTML email
//  * @param {string} to - Recipient email
//  * @param {string} subject - Email subject
//  * @param {string} html - HTML content
//  */
// export const sendEmail = async (to, subject, html) => {
//   try {
//     const mailOptions = {
//       from: `"Waghera Tourism" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("📧 Email sent successfully:", info.messageId);
//     return true;
//   } catch (error) {
//     console.error("❌ Email sending failed:", error);
//     return false;
//   }
// };

// /**
//  * Send an email with attachment
//  * @param {string} to - Recipient email
//  * @param {string} subject - Email subject
//  * @param {string} html - HTML content
//  * @param {Buffer} attachmentBuffer - Attachment as Buffer
//  * @param {string} filename - Attachment file name
//  */
// export const sendEmailWithAttachment = async (to, subject, html, attachmentBuffer, filename) => {
//   try {
//     const mailOptions = {
//       from: `"Waghera Tourism" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//       attachments: [{ filename, content: attachmentBuffer }],
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("📧 Email with attachment sent:", info.messageId);
//     return true;
//   } catch (error) {
//     console.error("❌ Email with attachment failed:", error);
//     return false;
//   }
// };



import nodemailer from "nodemailer";

// Create transporter (Gmail example)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS  // app password if using Gmail
    }
});

/**
 * Send email with HTML content and optional attachment
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} htmlBody - HTML content of the email
 * @param {Buffer} attachmentBuffer - optional attachment as Buffer
 * @param {string} filename - attachment file name
 */
export const sendEmailWithAttachment = async (to, subject, htmlBody, attachmentBuffer, filename) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlBody,
            attachments: attachmentBuffer ? [
                {
                    filename,
                    content: attachmentBuffer
                }
            ] : []
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to} successfully`);
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
};
