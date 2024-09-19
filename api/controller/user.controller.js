import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({ message: "Api is working" });
};

export const logout = (req, res, next) => {
  console.log("logout");
  try {
    res.clearCookie("access_token").status(200).json("User has been successfully sign out!");
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(401, "Unauthorized access!"));

  try {
    const users = await User.find();

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    res.status(200).json(usersWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) return next(errorHandler(401, "Unathorized access!"));
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};
