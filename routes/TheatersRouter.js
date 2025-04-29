const express = require("express");
const router = express.Router();
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middlewares/authMiddleware");
const TheaterController = require("../controllers/TheaterController");

router.get("/GetAll", TheaterController.GetAllTheaters);
router.get("/GetDetail/:id", TheaterController.getTheaterById);
router.post("/create", authMiddleWare, TheaterController.CreateTheater);
router.put("/update/:id", authMiddleWare, TheaterController.UpdateTheater),
router.delete("/delete/:id", authMiddleWare, TheaterController.DeleteTheater),
  (module.exports = router);
