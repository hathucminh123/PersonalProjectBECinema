const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authMiddleWare, authUserMiddleWare } = require("../middlewares/authMiddleware");

router.post("/sign-up", userController.CreateUser);
router.post("/sign-in", userController.Login);
// router.post('/log-out')
// router.put('/update-user/:id')
// // router.delete('/delete-user/:id', authMiddleWare, userController.deleteUser)
// router.get('/getAll')
// router.get('/get-details/:id')
// router.post('/refresh-token', userController.refreshToken)
// router.post('/delete-many', authMiddleWare, userController.deleteMany)

module.exports = router;
