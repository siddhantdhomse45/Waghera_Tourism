import PDFDocument from "pdfkit";
import { Buffer } from "buffer";

export const generatePdf = async (booking) => {
    return new Promise((resolve) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => resolve(Buffer.concat(buffers)));

        doc.fontSize(20).text("Booking Confirmation", { align: "center" });
        doc.text(`Booking ID: ${booking._id}`);
        doc.text(`Check-in: ${booking.checkInDate}`);
        doc.text(`Check-out: ${booking.checkOutDate}`);
        doc.end();
    });
};
