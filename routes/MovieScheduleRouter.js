const express = require("express");
const router = express.Router();
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middlewares/authMiddleware");
const MovieScheduleController = require("../controllers/MovieScheduleController");

router.get("/CreateSchedule", MovieScheduleController.createSchedule);
router.get("/GetAllSchedule", MovieScheduleController.getAllSchedules);
router.get("/GetScheduleById/:id", MovieScheduleController.getScheduleById);
router.post(
  "/CreateSchedule",
  authMiddleWare,
  MovieScheduleController.createSchedule
);

router.put(
  "/UpdateSchedule/:id",
  authMiddleWare,
  MovieScheduleController.updateSchedule
);
router.delete(
  "/DeleteSchedule/:id",
  authMiddleWare,
  MovieScheduleController.deleteSchedule
);
router.get(
  "/GetMoviesWithTheaters",
  MovieScheduleController.getMoviesWithTheaters
);
router.get(
  "/GetScheduleByMovieId/:id",
  MovieScheduleController.getTheatersByMovieId
);
router.get(
  "/GetScheduleByTheaterId/:id",
  MovieScheduleController.getMoviesByTheaterId
);

module.exports = router;
