import AdminRoom from "../models/AdminRoom.js";

// CREATE ROOM
export const createRoom = async (req, res) => {
  try {
    const room = new AdminRoom(req.body);
    const savedRoom = await room.save();

    return res.status(201).json({
      message: "Room created successfully",
      data: savedRoom,
      location: `/api/admin/rooms/${savedRoom._id}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ROOM
export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await AdminRoom.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRoom)
      return res.status(404).json({ message: "Room not found" });

    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE ROOM
export const deleteRoom = async (req, res) => {
  try {
    const room = await AdminRoom.findByIdAndDelete(req.params.id);

    if (!room)
      return res.status(404).json({ message: "Room not found" });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ROOM BY ID
export const getRoom = async (req, res) => {
  try {
    const room = await AdminRoom.findById(req.params.id);

    if (!room)
      return res.status(404).json({ message: "Room not found" });

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ROOMS
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await AdminRoom.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
