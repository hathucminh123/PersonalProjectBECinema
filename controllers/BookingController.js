const BookingService = require("../Services/BookingService");


const createBooking = async (req, res) => {
    try {
        const bookingData = req.body.booking;
        const bookingDetailsData = req.body.bookingDetails;
        const result = await BookingService.createBooking(bookingData, bookingDetailsData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: "ERR", message: error.message });
    }
    }
const getAllBookings = async (req, res) => {
    try {
        const result = await BookingService.getAllBookings();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: "ERR", message: error.message });
    }
}
const getBookingById = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const result = await BookingService.getBookingById(bookingId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: "ERR", message: error.message });
    }
}
const updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const bookingData = req.body;
        const result = await BookingService.updateBooking(bookingId, bookingData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: "ERR", message: error.message });
    }
}
const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const result = await BookingService.deleteBooking(bookingId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: "ERR", message: error.message });
    }
}
const getBookingByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await BookingService.getBookingByUserId(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: "ERR", message: error.message });
    }
}
const getBookingByShowTimeId = async (req, res) => {
    try {
        const showTimeId = req.params.showTimeId;
        const result = await BookingService.getBookingByShowTimeId(showTimeId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: "ERR", message: error.message });
    }
}
const updateBookingStatus = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const status = req.body.status;
        const result = await BookingService.updateBookingStatus(bookingId, status);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: "ERR", message: error.message });
    }
}


module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    getBookingByUserId,
    getBookingByShowTimeId,
    updateBookingStatus
}

