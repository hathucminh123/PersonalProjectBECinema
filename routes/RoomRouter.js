// routes/room.js
const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/RoomController");
const {
    authMiddleWare,
    authUserMiddleWare,
  } = require("../middlewares/authMiddleware");
  const TheaterController = require("../controllers/TheaterController");
router.post("/createRoom",authMiddleWare, RoomController.createRoom);
router.get("/", RoomController.getAllRooms);
router.get("/:id", RoomController.getRoomById);
router.put("/:id",authMiddleWare, RoomController.updateRoom);
router.delete("/:id",authMiddleWare, RoomController.deleteRoom);

module.exports = router;
