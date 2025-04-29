const GenreController = require("../controllers/GenreController");
const Router = require("express").Router();
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middlewares/authMiddleware");

Router.post("/CreateGenre", authMiddleWare, GenreController.createGenre);
Router.get("/GetAllGenres", GenreController.getAllGenres);
Router.get("/GetGenreById/:id", GenreController.getGenreById);
Router.put("/UpdateGenre/:id", authMiddleWare, GenreController.updateGenre);
Router.delete("/DeleteGenre/:id", authMiddleWare, GenreController.deleteGenre);
Router.get("/GetGenreByName/:name", GenreController.getGenreByName);
module.exports = Router;
