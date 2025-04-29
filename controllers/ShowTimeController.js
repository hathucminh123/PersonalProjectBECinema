const ShowTimeService = require("../Services/ShowTimeService");



const getAllShowTimes = async (req, res) => {
    try {
        const result = await ShowTimeService.getAllShowTimes();
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
    }
const getShowTimeById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ShowTimeService.getShowTimeById(id);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
}
const createShowTime = async (req, res) => {
    try {
        const showTimeData = req.body;
        const result = await ShowTimeService.createShowTime(showTimeData);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
}
const updateShowTime = async (req, res) => {
    try {
        const { id } = req.params;
        const showTimeData = req.body;
        const result = await ShowTimeService.updateShowTime(id, showTimeData);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
}
const deleteShowTime = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ShowTimeService.deleteShowTime(id);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
}
const getShowTimesByMovieId = async (req, res) => {
    try {
        const { movieId } = req.params;
        const result = await ShowTimeService.getShowTimesByMovieId(movieId);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
}
const getShowTimesByRoomId = async (req, res) => {
    try {
        const { roomId } = req.params;
        const result = await ShowTimeService.getShowTimesByRoomId(roomId);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
}


module.exports = {
    getAllShowTimes,
    getShowTimeById,
    createShowTime,
    updateShowTime,
    deleteShowTime,
    getShowTimesByMovieId,
    getShowTimesByRoomId
};