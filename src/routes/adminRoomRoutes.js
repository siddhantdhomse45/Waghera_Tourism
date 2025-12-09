import express from "express";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
} from "../controller/adminRoomController.js";

const router = express.Router();

router.post("/", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.get("/:id", getRoom);
router.get("/", getAllRooms);

export default router;
