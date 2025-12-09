import Contact from "../models/Contact.js";

// Save contact message
export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !name.trim()) return res.status(400).json({ message: "Name is required" });
    if (!email || !email.trim()) return res.status(400).json({ message: "Email is required" });
    if (!message || !message.trim()) return res.status(400).json({ message: "Message is required" });
    if (message.length > 1000) return res.status(400).json({ message: "Message is too long" });

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Error saving contact message:", err);
    res.status(500).json({ message: "Server error while sending message." });
  }
};

// Get all contact messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Server error while fetching messages." });
  }
};
