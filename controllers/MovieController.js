const MoviesService = require("../Services/MoviesService");

const GetAllMovies = async (req, res) => {
  try {
    const Movies = await MoviesService.getMovies();
    return res.status(200).json(Movies);
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const MovieId = req.params.id;
    if (!MovieId) {
      return res.status(400).json({
        status: "ERR",
        message: "The movieId is required",
      });
    }
    const movie = await MoviesService.GetMoviesById(MovieId);
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
    });
  }
};

const CreateMovie = async (req, res) => {
  const {
    title,
    description,
    duration,
    director,
    actors,
    releaseDate,
    endDate,
    trailerUrl,
    posterUrl,
  } = req.body;
  try {
    if (
      !title ||
      !description ||
      !duration ||
      !director ||
      !actors ||
      !releaseDate ||
      !endDate ||
      !trailerUrl ||
      !posterUrl
    ) {
      return res.status(400).json({
        status: "ERR",
        message: "All fields are required",
      });
    } else if (new Date(endDate) < new Date(releaseDate)) {
      return res.status(400).json({
        status: "ERR",
        message: "Release date must be earlier than end date",
      });
    }

    const movie = await MoviesService.CreateMovie(req.body);
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
    });
  }
};

const UpdateMovie = async (req, res) => {
  try {
    const MovieId = req.params.id;
    const {
      title,
      description,
      duration,
      director,
      actors,
      releaseDate,
      endDate,
      trailerUrl,
      posterUrl,
    } = req.body;

    if (
      !title ||
      !description ||
      !duration ||
      !director ||
      !actors ||
      !releaseDate ||
      !endDate ||
      !trailerUrl ||
      !posterUrl
    ) {
      return res.status(400).json({
        status: "ERR",
        message: "All fields are required",
      });
    } else if (new Date(endDate) < new Date(releaseDate)) {
      return res.status(400).json({
        status: "ERR",
        message: "Release date must be earlier than end date",
      });
    } else if (!MovieId) {
      return res.status(400).json({
        status: "ERR",
        message: "The movieId is required",
      });
    }

    const updateMovie = await MoviesService.UpdateMovie(MovieId, req.body);
    return res.status(200).json(updateMovie);
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
    });
  }
};

const DeleteMovie = async (req, res) => {
  try {
    const MovieId = req.params.id;

    if (!MovieId) {
      return res.status(400).json({
        status: "ERR",
        message: "The movieId is required",
      });
    }

    const response = await MoviesService.DeleteMoviesById(MovieId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
    });
  }
};

module.exports = {
  GetAllMovies,
  getMovieById,
  CreateMovie,
  UpdateMovie,
  DeleteMovie,
};
