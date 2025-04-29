const Router = require('express').Router();
const ShowTimeController = require('../controllers/ShowTimeController');
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middlewares/authMiddleware");

Router.get('/GetAll', ShowTimeController.getAllShowTimes);
Router.get('/GetDetail/:id', ShowTimeController.getShowTimeById);
Router.post('/create', authMiddleWare, ShowTimeController.createShowTime);
Router.put('/update/:id', authMiddleWare, ShowTimeController.updateShowTime);
Router.delete('/delete/:id', authMiddleWare, ShowTimeController.deleteShowTime);
Router.get('/GetShowTimesByMovieId/:movieId', ShowTimeController.getShowTimesByMovieId);
Router.get('/GetShowTimesByRoomId/:roomId', ShowTimeController.getShowTimesByRoomId);


module.exports = Router;

