const TheatersService = require("../Services/TheatersService");

const GetAllTheaters = async (req, res) => {
  try {
    const theaters = await TheatersService.getTheater();
    return res.status(200).json(theaters);
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
    });
  }
};

const getTheaterById = async (req, res) => {
  try {
    const TheaterId = req.params.id;
    if (!TheaterId) {
      return res.status(400).json({
        status: "ERR",
        message: "The TheaterId is required",
      });
    }
    const theater = await TheatersService.getTheaterById(TheaterId);
    return res.status(200).json(theater);
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
    });
  }
};

const CreateTheater = async (req, res) => {
  const { name, location } = req.body;
  try {
    if (!name || !location) {
      return res.status(400).json({
        status: "ERR",
        message: "All fields are required",
      });
    }
    const theater = await TheatersService.CreateTheater(req.body);
    return res.status(200).json(theater);
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
    });
  }
};

const UpdateTheater = async (req, res) => {
  try {
    const TheaterId = req.params.id;
    const { name, location } = req.body;

    if (!name || !location) {
      return res.status(400).json({
        status: "ERR",
        message: "All fields are required",
      });
    } else if (!TheaterId) {
      return res.status(400).json({
        status: "ERR",
        message: "The TheaterId is required",
      });
    }

    const updateTheater = await TheatersService.UpdateTheater(
      TheaterId,
      req.body
    );
    return res.status(200).json(updateTheater);
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
    });
  }
};

const DeleteTheater = async (req, res) => {
  try {
    const TheaterId = req.params.id;

    if (!TheaterId) {
      return res.status(400).json({
        status: "ERR",
        message: "The TheaterId is required",
      });
    }

    const response = await TheatersService.DeleteTheaterById(TheaterId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
    });
  }
};

module.exports = {
  GetAllTheaters,
  getTheaterById,
  CreateTheater,
  UpdateTheater,
  DeleteTheater,
};
