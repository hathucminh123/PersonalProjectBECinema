const SeatService = require("../Services/SeatService");

const SeatController = {
  createSeat: async (req, res) => {
    try {
      const response = await SeatService.createSeat(req.body);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  getAllSeats: async (req, res) => {
    try {
      const response = await SeatService.getAllSeats();
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getSeatById: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await SeatService.getSeatById(id);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json(err);
    }
  },

  getSeatsByRoom: async (req, res) => {
    try {
      const { roomId } = req.params;
      const response = await SeatService.getSeatsByRoom(roomId);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json(err);
    }
  },

  updateSeat: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await SeatService.updateSeat(id, req.body);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  deleteSeat: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await SeatService.deleteSeat(id);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
};

module.exports = SeatController;
