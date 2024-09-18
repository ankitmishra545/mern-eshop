import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if ([name, email, password].includes("")) {
    next(errorHandler(400, "All fields are required!"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ name, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("succesfully signedup");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if ([email, password].includes("")) {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      next(errorHandler(404, "User not found!"));
    }

    const isValidPassword = bcryptjs.compareSync(password, user.password);

    if (!isValidPassword) {
      next(401, "Invalid credentials entered!");
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);

    const { password: pass, ...rest } = user._doc;

    res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest);
  } catch (error) {
    next(error);
  }
};
