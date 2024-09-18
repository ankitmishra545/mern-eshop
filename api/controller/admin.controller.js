import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const getAllUsers = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(401, "Unauthorized access!"));

  try {
    const users = await User.find();
    const totalUsers = await User.countDocuments();

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    res.status(200).json({ users: usersWithoutPassword, totalUsers });
  } catch (error) {
    next(error);
  }
};
