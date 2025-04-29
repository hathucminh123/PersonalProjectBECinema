const express = require("express");
const router = express.Router();
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middlewares/authMiddleware");
const MoviesController = require("../controllers/MovieController");

router.get("/GetAll", MoviesController.GetAllMovies);
router.get("/GetDetail/:id", MoviesController.getMovieById);
router.post("/create", authMiddleWare, MoviesController.CreateMovie);
router.put("/update/:id", authMiddleWare, MoviesController.UpdateMovie),
  router.delete("/delete/:id", authMiddleWare, MoviesController.DeleteMovie),
  (module.exports = router);
