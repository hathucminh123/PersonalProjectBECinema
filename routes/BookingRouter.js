const Router = require("express").Router();
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middlewares/authMiddleware");
const BookingController = require("../controllers/BookingController");

Router.post("/createBooking", authMiddleWare, BookingController.createBooking);
// Router.get(
//   "/getUserBookings",
//   authMiddleWare,
//   BookingController.ge
// );
Router.get("/getBooking/:id", authMiddleWare, BookingController.getBookingById);
Router.get("/getAllBookings", authMiddleWare, BookingController.getAllBookings);
Router.get(
  "/getBookingByUserId/:userId",
  authMiddleWare,
  BookingController.getBookingByUserId
);

Router.put(
  "/updateBooking/:id",
  authMiddleWare,
  BookingController.updateBooking
);
Router.delete(
  "/deleteBooking/:id",
  authMiddleWare,
  BookingController.deleteBooking
);

Router.get(
  "/getBookingByUserId/:userId",
  authMiddleWare,
  BookingController.getBookingByUserId
);
Router.get(
  "/getBookingById/:id",
  authMiddleWare,
  BookingController.getBookingById
);

module.exports = Router;
