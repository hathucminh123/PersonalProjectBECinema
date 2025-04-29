const Payment = require("../controllers/PaymentController");

const Router = require("express").Router();

Router.post("/momo", Payment.createPaymentUrl);
// Router.post("/momo/ipn", Payment.IPN);
Router.post("/momo/return", Payment.callback);
Router.post("/momo/transactionStatus", Payment.transactionStatus);

module.exports = Router;
