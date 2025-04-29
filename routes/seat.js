// routes/seat.js
const express = require("express");
const router = express.Router();
const SeatController = require("../controllers/SeatController");
const {
    authMiddleWare,
    authUserMiddleWare,
  } = require("../middlewares/authMiddleware");
  const TheaterController = require("../controllers/TheaterController");

router.post("/Create",authMiddleWare, SeatController.createSeat);
router.get("/", SeatController.getAllSeats);
router.get("/:id", SeatController.getSeatById);
router.get("/room/:roomId", SeatController.getSeatsByRoom);
router.put("/:id",authMiddleWare, SeatController.updateSeat);
router.delete("/:id",authMiddleWare, SeatController.deleteSeat);

module.exports = router;
