import Booking from "../models/bookingModel.js";
import Room from "../models/AdminRoom.js";
import User from "../models/User.js";
import ExtraService from "../models/extraServiceModel.js";
import { generatePdf } from "../services/pdfService.js";
import { sendEmailWithAttachment } from "../services/emailService.js";

const EXTRA_BED_PRICE = 300;

// POST /api/bookings
export const handleCreateBooking = async (req, res) => {
    try {
        const data = req.body;

        // 1. Find room
        const room = await Room.findById(data.roomId);
        if (!room || room.status !== "AVAILABLE") throw new Error("Room not available");

        // 2. Find user
        const user = await User.findById(data.userId);
        if (!user) throw new Error("User not found");

        // 3. Check overlapping bookings
        const overlaps = await Booking.find({
            room: room._id,
            $or: [
                { checkInDate: { $lt: new Date(data.checkOutDate), $gte: new Date(data.checkInDate) } },
                { checkOutDate: { $gt: new Date(data.checkInDate), $lte: new Date(data.checkOutDate) } },
                { checkInDate: { $lte: new Date(data.checkInDate) }, checkOutDate: { $gte: new Date(data.checkOutDate) } }
            ]
        });
        if (overlaps.length > 0) throw new Error("Room already booked");

        // 4. Get extra services if any
        const services = data.serviceIds ? await ExtraService.find({ _id: { $in: data.serviceIds } }) : [];

        // 5. Calculate total price
        const nights = Math.ceil((new Date(data.checkOutDate) - new Date(data.checkInDate)) / (1000 * 60 * 60 * 24));
        const totalPrice = (room.price * nights) +
            (services.reduce((sum, s) => sum + s.pricePerNight * nights, 0)) +
            (data.extraBed * EXTRA_BED_PRICE * nights);

        // 6. Create booking object
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

        // 7. Save booking
        const savedBooking = await booking.save();

        // 8. Generate PDF and send email
        const pdfBuffer = await generatePdf(savedBooking);
        await sendEmailWithAttachment(
            user.email,
            `Booking Confirmation - #${savedBooking._id}`,
            `Your booking is confirmed.`,
            pdfBuffer,
            `booking_${savedBooking._id}.pdf`
        );

        res.status(200).json(savedBooking);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Optional GET route to test booking API
export const testBookingRoute = (req, res) => {
    res.json({ message: "Booking route is working" });
};
