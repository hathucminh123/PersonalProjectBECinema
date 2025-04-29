const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  payment_time: { type: Date, default: Date.now },
  amount: {
    type: Number,
    required: true,
    // amount nên lấy từ booking.totalPrice
  },
  method: {
    type: String,
    enum: ["momo", "vnpay", "zalopay", "cash"],
    required: true
  },
  status: {
    type: String,
    enum: ["success", "failed", "pending"],
    default: "pending"
  },
  transactionId: {
    type: String // ID giao dịch từ Momo/VnPay trả về
  },
  orderId: {
    type: String // Mã đơn hàng (thường là booking._id hoặc mã riêng tạo ra)
  }
});

module.exports = mongoose.model("Payment", PaymentSchema);
