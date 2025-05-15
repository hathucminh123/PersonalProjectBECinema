const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require('./routes')
const mongoose = require("mongoose");
const app = express();
// const PORT = 3000;

dotenv.config();
const PORT = process.env.PORT ||3001
//middle
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(cookieParser());


// Routes
app.get("/", (req, res) => {
  res.send("Hello Node.js!");
});


routes(app);



mongoose.connect('mongodb://localhost:27017/BookingMoviesBE', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true

})
.then(() => console.log("✅ Kết nối MongoDB thành công!"))
.catch((err) => console.error("❌ Lỗi khi kết nối:", err));

//start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
