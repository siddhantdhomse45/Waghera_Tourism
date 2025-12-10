import { checkAvailability } from "../services/availabilityService.js";

export const handleCheckAvailability = async (req, res) => {
    try {
        const rooms = await checkAvailability(req.body.checkInDate, req.body.checkOutDate);
        res.status(200).json(rooms);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
