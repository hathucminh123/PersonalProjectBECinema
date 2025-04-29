const RoomService = require("../Services/RoomService");

const RoomController = {
  createRoom: async (req, res) => {
    try {
      const response = await RoomService.createRoom(req.body);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  getAllRooms: async (req, res) => {
    try {
      const response = await RoomService.getAllRooms();
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getRoomById: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await RoomService.getRoomById(id);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json(err);
    }
  },

  updateRoom: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await RoomService.updateRoom(id, req.body);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  deleteRoom: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await RoomService.deleteRoom(id);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
};

module.exports = RoomController;
