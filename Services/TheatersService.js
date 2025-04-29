const Theater = require("../models/TheatersModel");

const CreateTheater = async (newTheater) => {
  try {
    const { name, location } = newTheater;
    const existing = await Theater.findOne({ name, location });
    if (existing) {
      return {
        status: "ERR",
        message: "Rạp này đã tồn tại!",
      };
    }
    const theater = await Theater.create({
      name: name,
      location: location,
    });
    return {
      status: "OK",
      message: "Tạo Theater thành công",
      data: theater,
    };
  } catch (err) {
    throw {
      status: "ERR",
      message: err.message,
    };
  }
};

const getTheater = async () => {
  try {
    const TheatersList = await Theater.find();
    return {
      status: "OK",
      message: "Success",
      data: TheatersList,
    };
  } catch (err) {
    throw {
      status: "ERR",
      message: err.message,
    };
  }
};

const getTheaterById = async (id) => {
  try {
    const theater = await Theater.findById(id);
    if (!theater) {
      throw {
        status: "ERR",
        message: "Theater not found",
      };
    } else {
      return {
        status: "OK",
        message: "Success",
        data: theater,
      };
    }
  } catch (err) {
    throw {
      status: "ERR",
      message: err.message,
    };
  }
};

const UpdateTheater = async (id, updateTheater) => {
  try {
    const theater = await Theater.findByIdAndUpdate(id, updateTheater, {
      new: true,
    });
    if (!theater) {
      throw {
        status: "ERR",
        message: "Theater not found",
      };
    } else {
      return {
        status: "OK",
        message: "Cập nhật Movie thành công",
        data: theater,
      };
    }
  } catch (err) {
    throw {
      status: "ERR",
      message: err.message,
    };
  }
};

const DeleteTheaterById = async (id) => {
  try {
    const theater = await Theater.findById(id);
    if (theater) {
      await Theater.deleteOne({ _id: id });
      return {
        status: "OK",
        message: `Xoá theater "${theater.location}" thành công`,
        data: theater,
      };
    } else {
      throw {
        status: "ERR",
        message: "theater không tồn tại",
      };
    }
  } catch (err) {
    throw {
      status: "ERR",
      message: err.message,
    };
  }
};

module.exports = {
  CreateTheater,
  getTheater,
  getTheaterById,

  UpdateTheater,
  DeleteTheaterById,
};
