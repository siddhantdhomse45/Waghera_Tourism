import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: "langheps2003@gmail.com",
    pass: "fbgy bxvz xlrh uhzi", // Gmail App Password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
