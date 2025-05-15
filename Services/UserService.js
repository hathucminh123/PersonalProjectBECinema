const User = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "Email đã tồn tại",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hash,
        phone,
        confirmPassword
      });
      if (createdUser) {
        resolve({
          status: "OK",
          message: "Tạo tài khoản thành công",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const LoginUser = (data) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = data;
    try {
      const checkUser = await User.findOne({ email });

      if (!checkUser) {
        return resolve({
          status: "ERR",
          message: "Email chưa đăng ký. Vui lòng đăng ký!",
        });
      }

      const valid = await bcrypt.compare(password, checkUser.password);
      if (!valid) {
        return resolve({
          status: "ERR",
          message: "Mật khẩu không đúng",
        });
      }

      const access_token = await genneralAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "OK",
        message: "Đăng nhập thành công",
        access_token,
        refresh_token,
      });
    } catch (err) {
      reject(err);
    }
  });
};


module.exports = {
  createUser,
  LoginUser
};
