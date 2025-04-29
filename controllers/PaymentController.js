const crypto = require("crypto");
const axios = require("axios");
const BookingDetail = require("../models/BookingDetailModel");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");

const accessKey = "F8BBA842ECF85";
const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
const partnerCode = "MOMO";
const redirectUrl = "https://momo.vn/return";
const ipnUrl = "https://callback.url/notify"; // Update thành URL server thực tế

// Tạo URL thanh toán MoMo
const createPaymentUrl = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const bookingDetails = await BookingDetail.find({ booking: bookingId });
    if (!bookingDetails.length) {
      return res.status(404).json({ status: "ERR", message: "Không tìm thấy chi tiết đặt vé." });
    }

    const amount = bookingDetails.reduce((sum, item) => sum + item.price, 0);
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const orderInfo = `Thanh toán vé xem phim - BookingID: ${bookingId}`;
    const requestType = "captureWallet";
    const extraData = "";

    const rawSignature =
      `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}` +
      `&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}` +
      `&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto.createHmac("sha256", secretkey).update(rawSignature).digest("hex");

    const requestBody = {
      partnerCode,
      accessKey,
      requestId,
      amount: `${amount}`,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData,
      requestType,
      signature,
      lang: "en"
    };

    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    // Lưu thông tin thanh toán vào DB
    await Payment.create({
      booking: bookingId,
      amount,
      method: "momo",
      status: "pending"
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Create Payment Error:", error);
    res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Callback MoMo sau khi thanh toán (IPN)
const callback = async (req, res) => {
  try {
    const { orderId, resultCode, message } = req.body;
    console.log("Callback MoMo:", req.body);

    // Truy vấn trạng thái thanh toán bằng orderId
    const payment = await Payment.findOne({});

    if (!payment) return res.status(404).json({ message: "Không tìm thấy giao dịch" });

    // Cập nhật trạng thái
    if (resultCode === 0) {
      payment.status = "success";
      await payment.save();

      await Booking.findByIdAndUpdate(payment.booking, {
        status: "confirmed"
      });
    } else {
      payment.status = "failed";
      await payment.save();
    }

    res.status(200).json({ status: "OK", message: "Cập nhật thanh toán thành công." });
  } catch (error) {
    console.error("Callback Error:", error);
    res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Kiểm tra trạng thái giao dịch theo orderId
const transactionStatus = async (req, res) => {
  try {
    const { orderId } = req.body;

    const rawSignature =
      `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${orderId}`;

    const signature = crypto.createHmac("sha256", secretkey).update(rawSignature).digest("hex");

    const requestBody = {
      partnerCode,
      requestId: orderId,
      orderId,
      signature,
      lang: "en"
    };

    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/query",
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Transaction Status Error:", error);
    res.status(500).json({ status: "ERR", message: error.message });
  }
};

module.exports = {
  createPaymentUrl,
  callback,
  transactionStatus
};
