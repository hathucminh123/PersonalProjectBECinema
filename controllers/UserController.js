const UserService = require("../Services/UserService");
const JwtService = require("../Services/JwtService");

const CreateUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is email",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password is equal confirmPassword",
      });
    }

    const response = await UserService.createUser(req.body);

    return res.status(200).json(response);
  } catch (err) {
    return res.status(404).json({
      message: e,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const reg = /^\w+([-.']?\w+)*@\w+([-.]?\w+)*(\.\w{2,3})+$/;
    const isCheckEmail = reg.test(email);

    if (!email || !password) {
      return res.status(400).json({
        status: "ERR",
        message: "Email và mật khẩu là bắt buộc",
      });
    }

    if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERR",
        message: "Email không hợp lệ",
      });
    }

    const response = await UserService.LoginUser(req.body);

    if (response.status !== "OK") {
      return res.status(401).json(response);
    }

    const { refresh_token, ...newResponse } = response;

    // Set cookie
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false, // đổi thành true nếu dùng HTTPS
      sameSite: "strict",
      path: "/",
    });

    return res.status(200).json({ ...newResponse, refresh_token });

  } catch (err) {
    return res.status(500).json({
      status: "ERR",
      message: err.message || "Internal server error",
    });
  }
};



module.exports={
    CreateUser,
    Login
}