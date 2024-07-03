import User from "../models/user_model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  try {

    const { username, email, password } = req.body;

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "error in hashed password",
      });
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {

    //   next(errorHandler(500 , error.message));
    next(error);
  }
};
