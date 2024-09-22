import { redis } from "../index.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({ message: "Api is working" });
};

// clearing the cookie of user in browser
export const logout = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("User has been successfully sign out!");
  } catch (error) {
    next(error);
  }
};

// this request sends the all users in db
export const getAllUsers = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(401, "Unauthorized access!"));
  try {
    //checking the cache for all users if existed then sends response from cache
    const redishData = await redis.get("allUsers");
    if (redishData) {
      return res.status(200).json(JSON.parse(redishData));
    }

    // if no cache result then find all users from User and extracting password from this, and then send response the users without password
    const users = await User.find();

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    await redis.set("allUsers", JSON.stringify(usersWithoutPassword));
    res.status(200).json(usersWithoutPassword);
  } catch (error) {
    next(error);
  }
};

// deleting the user by the admn request
export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) return next(errorHandler(401, "Unathorized access!"));
  try {
    await User.findByIdAndDelete(req.params.userId);
    redis.del("allUsers");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};
