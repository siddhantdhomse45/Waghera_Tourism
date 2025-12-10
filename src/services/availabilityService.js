// import Room from "../models/AdminRoom.js";
// import Booking from "../models/bookingModel.js";

// export const checkAvailability = async (checkIn, checkOut) => {
//     const allRooms = await Room.find({ status: "AVAILABLE" });
//     const availableRooms = [];

//     for (const room of allRooms) {
//         const overlapping = await Booking.find({
//             room: room._id,
//             $or: [
//                 { checkInDate: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
//                 { checkOutDate: { $gt: new Date(checkIn), $lte: new Date(checkOut) } },
//                 { checkInDate: { $lte: new Date(checkIn) }, checkOutDate: { $gte: new Date(checkOut) } }
//             ]
//         });

//         if (overlapping.length === 0) availableRooms.push(room);
//     }

//     return availableRooms;
// };







import Room from "../models/AdminRoom.js";
import Booking from "../models/bookingModel.js";

export const checkAvailability = async (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // 1. Get all rooms that are marked as AVAILABLE
    const allRooms = await Room.find({ status: "AVAILABLE" });

    const availableRooms = [];

    for (const room of allRooms) {

        // 2. Check if any booking overlaps
        const overlapping = await Booking.find({
            room: room._id,
            $or: [
                // Case 1: Booking starts inside selected range
                { checkInDate: { $lt: checkOutDate, $gte: checkInDate } },

                // Case 2: Booking ends inside selected range
                { checkOutDate: { $gt: checkInDate, $lte: checkOutDate } },

                // Case 3: Booking fully covers the selected range
                { checkInDate: { $lte: checkInDate }, checkOutDate: { $gte: checkOutDate } }
            ]
        });

        // 3. If NO overlapping found → room is free
        if (overlapping.length === 0) {
            availableRooms.push(room);
        }
    }

    // 4. Only return rooms that are fully free
    return availableRooms;
};
