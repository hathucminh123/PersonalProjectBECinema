const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    showTime: { type: mongoose.Schema.Types.ObjectId, ref: "ShowTime" },
    totalPrice: Number,
    bookingDate: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending"
      },
  });
  
 const Booking =  mongoose.model('Booking',BookingSchema);

 module.exports = Booking