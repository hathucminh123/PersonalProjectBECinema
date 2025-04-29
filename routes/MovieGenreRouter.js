const Router = require('express').Router();
const MovieGenreController = require('../controllers/MovieGenreController');
const {
    authMiddleWare,
    authUserMiddleWare,
  } = require("../middlewares/authMiddleware");

Router.post('/CreateMovieGenre', authMiddleWare, MovieGenreController.createMovieGenre);
Router.get('/GetAllMovieGenres', MovieGenreController.getAllMovieGenres);
Router.get('/GetMovieGenreById/:id', MovieGenreController.getMovieGenreById);
Router.put('/UpdateMovieGenre/:id', authMiddleWare, MovieGenreController.updateMovieGenre);
Router.delete('/DeleteMovieGenre/:id', authMiddleWare, MovieGenreController.deleteMovieGenre);
Router.get('/GetMovieGenreByMovieId/:movieId', MovieGenreController.getMovieGenreByMovieId);
Router.get('/GetMovieGenreByGenreId/:genreId', MovieGenreController.getMovieGenreByGenreId);


module.exports = Router;