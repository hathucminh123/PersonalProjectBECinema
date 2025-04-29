const UserRouter = require("./UserRouter");
const MoviesRouter = require("./MoviesRouter");
const TheatersRouter = require("./TheatersRouter");
const MovieScheduleRouter = require("./MovieScheduleRouter");
const RoomRuter = require("./RoomRouter");
const SeatRouter = require("./seat");
const ShowTimeRouter = require("./ShowTimeRouter");
const GenreRouter = require("./GenreRouter");
const MovieGenreRouter = require("./MovieGenreRouter");
const BookingRouter = require("./BookingRouter");
const PaymentRouter = require("./PaymentRouter");
// const ProductRouter = require('./ProductRouter')
// const OrderRouter = require('./OrderRouter')
// const PaymentRouter = require('./PaymentRouter')

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/Movies", MoviesRouter);
  app.use("/api/Theaters", TheatersRouter);
  app.use("/api/MovieSchedule", MovieScheduleRouter);
  app.use("/api/Room", RoomRuter);
  app.use("/api/seat", SeatRouter);
  app.use("/api/showtime", ShowTimeRouter);
  app.use("/api/genre", GenreRouter);
  app.use("/api/moviegenre", MovieGenreRouter);
  app.use("/api/booking", BookingRouter);
  app.use("/api/payment", PaymentRouter);

  // app.use('/api/products', ProductRouter)
  // app.use('/api/order', OrderRouter)
  // app.use('/api/payment', PaymentRouter)
};

module.exports = routes;
