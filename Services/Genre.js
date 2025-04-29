const Genre = require("../models/Genre");

const createGenre = async (data) => {
  try {
    const { name } = data;
    const existingGenre = await Genre.find({ name });
    if (existingGenre.length > 0) {
      return {
        status: "ERR",
        message: "Thể loại đã tồn tại",
      };
    }
    const newGenre = await Genre.create({
      name,
    });
    // await newGenre.save();
    return {
      status: "OK",
      message: "Tạo thể loại thành công",
      data: newGenre,
    };
  } catch (error) {
    throw new Error("Error creating genre: " + error.message);
  }
};

const getAllGenres = async () => {
  try {
    const genres = await Genre.find();
    return {
      status: "OK",
      message: "Lấy danh sách thể loại thành công",
      data: genres,
    };
  } catch (error) {
    throw new Error("Error fetching genres: " + error.message);
  }
};

const getGenreById = async (id) => {
  try {
    const genre = await Genre.findById(id);
    if (!genre) {
      return {
        status: "ERR",
        message: "Thể loại không tồn tại",
      };
    }
    return {
      status: "OK",
      message: "Lấy thể loại thành công",
      data: genre,
    };
  } catch (error) {
    throw new Error("Error fetching genre: " + error.message);
  }
};

const updateGenre = async (id, data) => {
  try {
    const { name } = data;
    const existingGenre = await Genre.findById(id);
    if (!existingGenre) {
      return {
        status: "ERR",
        message: "Thể loại không tồn tại",
      };
    }
    const updatedGenre = await Genre.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    return {
      status: "OK",
      message: "Cập nhật thể loại thành công",
      data: updatedGenre,
    };
  } catch (error) {
    throw new Error("Error updating genre: " + error.message);
  }
};
const deleteGenre = async (id) => {
  try {
    const genre = await Genre.findById(id);
    if (!genre) {
      return {
        status: "ERR",
        message: "Thể loại không tồn tại",
      };
    }
    await Genre.findByIdAndDelete(id);
    return {
      status: "OK",
      message: "Xóa thể loại thành công",
      data: genre,
    };
  } catch (error) {
    throw new Error("Error deleting genre: " + error.message);
  }
};
const getGenreByName = async (name) => {
  try {
    const genre = await Genre.findOne({ name });
    if (!genre) {
      return {
        status: "ERR",
        message: "Thể loại không tồn tại",
      };
    }
    return {
      status: "OK",
      message: "Lấy thể loại thành công",
      data: genre,
    };
  } catch (error) {
    throw new Error("Error fetching genre: " + error.message);
  }
};
module.exports = {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
  getGenreByName,
};
