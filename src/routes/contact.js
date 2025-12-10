import express from "express";
// import { sendMessage, getAllMessages } from "../controller/contactController.js";
import { sendContactMail } from "../controller/contactController.js";
const router = express.Router();

// POST /api/contact/send
// router.post("/send", sendMessage);

// GET /api/contact/all
// router.get("/all", getAllMessages);

router.post("/", sendContactMail);

export default router;
