// import Booking from "../models/bookingModel.js";
// import Room from "../models/AdminRoom.js";
// import User from "../models/User.js";
// import ExtraService from "../models/extraServiceModel.js";
// import { generatePdf } from "./pdfService.js";
// import { sendEmailWithAttachment } from "./emailService.js";

// const EXTRA_BED_PRICE = 300;

// export const createBooking = async (data) => {
//     const room = await Room.findById(data.roomId);
//   console.log("Room found:", room); 
//     if (!room || room.status !== "AVAILABLE") throw new Error("Room not available");

//     const user = await User.findById(data.userId);
//     if (!user) throw new Error("User not found");

//     // Check overlapping bookings
//     const overlaps = await Booking.find({
//         room: room._id,
//         $or: [
//             { checkInDate: { $lt: new Date(data.checkOutDate), $gte: new Date(data.checkInDate) } },
//             { checkOutDate: { $gt: new Date(data.checkInDate), $lte: new Date(data.checkOutDate) } },
//             { checkInDate: { $lte: new Date(data.checkInDate) }, checkOutDate: { $gte: new Date(data.checkOutDate) } }
//         ]
//     });
//     if (overlaps.length > 0) throw new Error("Room already booked");

//     const services = data.serviceIds ? await ExtraService.find({ _id: { $in: data.serviceIds } }) : [];

//     const nights = Math.ceil((new Date(data.checkOutDate) - new Date(data.checkInDate)) / (1000 * 60 * 60 * 24));
//     const totalPrice = (room.price * nights) +
//         (services.reduce((sum, s) => sum + s.pricePerNight * nights, 0)) +
//         (data.extraBed * EXTRA_BED_PRICE * nights);

//     const booking = new Booking({
//         room: room._id,
//         user: user._id,
//         checkInDate: data.checkInDate,
//         checkOutDate: data.checkOutDate,
//         adults: data.adults,
//         children: data.children,
//         extraBed: data.extraBed,
//         extraServices: services.map(s => s._id),
//         totalPrice
//     });

//     const savedBooking = await booking.save();

//     // PDF + Email
//     const pdfBuffer = await generatePdf(savedBooking);
//     await sendEmailWithAttachment(user.email, `Booking Confirmation - #${savedBooking._id}`, `Your booking is confirmed.`, pdfBuffer, `booking_${savedBooking._id}.pdf`);

//     return savedBooking;
// };








import Booking from "../models/bookingModel.js";
import Room from "../models/AdminRoom.js";
import User from "../models/User.js";
import ExtraService from "../models/extraServiceModel.js";
import { generatePdf } from "./pdfService.js";
import { sendEmailWithAttachment } from "./emailService.js";

const EXTRA_BED_PRICE = 300;

export const createBooking = async (data) => {
    const room = await Room.findById(data.roomId);
    if (!room || room.status !== "AVAILABLE") throw new Error("Room not available");

    const user = await User.findById(data.userId);
    if (!user) throw new Error("User not found");

    // Check overlapping bookings
    const overlaps = await Booking.find({
        room: room._id,
        $or: [
            { checkInDate: { $lt: new Date(data.checkOutDate), $gte: new Date(data.checkInDate) } },
            { checkOutDate: { $gt: new Date(data.checkInDate), $lte: new Date(data.checkOutDate) } },
            { checkInDate: { $lte: new Date(data.checkInDate) }, checkOutDate: { $gte: new Date(data.checkOutDate) } }
        ]
    });
    if (overlaps.length > 0) throw new Error("Room already booked");

    const services = data.serviceIds ? await ExtraService.find({ _id: { $in: data.serviceIds } }) : [];

    const nights = Math.ceil((new Date(data.checkOutDate) - new Date(data.checkInDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = (room.price * nights) +
        (services.reduce((sum, s) => sum + s.pricePerNight * nights, 0)) +
        (data.extraBed * EXTRA_BED_PRICE * nights);

    const booking = new Booking({
        room: room._id,
        user: user._id,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        adults: data.adults,
        children: data.children,
        extraBed: data.extraBed,
        extraServices: services.map(s => s._id),
        totalPrice
    });

    const savedBooking = await booking.save();

    // PDF + Stylish Email
    const pdfBuffer = await generatePdf(savedBooking);

    // Stylish HTML template
    const htmlBody = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background:#f4f9f4;">
            <div style="background:white; padding:25px; border-radius:12px; border-left:5px solid #2e7d32;">
                <h2 style="color:#2e7d32;">🌿 Waghera Agro Tourism – Booking Confirmed 🌿</h2>
                <p>Hello <b>${user.name}</b>,</p>
                <p>Thank you for booking with Waghera Agro Tourism! We are excited to welcome you.</p>
                <h3>Booking Details</h3>
                <p>
                    <b>Room:</b> ${room.name || room._id}<br>
                    <b>Check-in:</b> ${new Date(savedBooking.checkInDate).toLocaleDateString()}<br>
                    <b>Check-out:</b> ${new Date(savedBooking.checkOutDate).toLocaleDateString()}<br>
                    <b>Total Guests:</b> ${savedBooking.adults} Adults, ${savedBooking.children} Children<br>
                    <b>Extra Bed:</b> ${savedBooking.extraBed}
                </p>
                <p>Your detailed PDF receipt is attached.</p>
                <hr/>
                <h3>🌾 Recommended Activities</h3>
                <ul>
                    <li>Nature Trail Walk</li>
                    <li>Sunset Point Visit</li>
                    <li>Village Tour Experience</li>
                    <li>Campfire Night (On Request)</li>
                </ul>
                <h3>🍽 Food Suggestions</h3>
                <p>Try our special Maharashtrian Thali & Farm Fresh Breakfast.</p>
                <h3>📞 Contact Info</h3>
                <p>
                    Phone: +91 9876543210<br>
                    Email: wagheragro@gmail.com<br>
                    Instagram: @wagheraagro_tourism
                </p>
                <p style="color:#2e7d32;">Warm Regards,<br><b>Waghera Agro Tourism Team</b></p>
            </div>
        </div>
    `;

    await sendEmailWithAttachment(
        user.email,
        `Booking Confirmation - #${savedBooking._id}`,
        htmlBody,
        pdfBuffer,
        `booking_${savedBooking._id}.pdf`
    );

    return savedBooking;
};
