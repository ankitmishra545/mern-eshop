import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { redis } from "../index.js";

export const signup = async (req, res, next) => {
  const { name, email, password, profileImage } = req.body;

  if ([name, email, password].includes("")) {
    next(errorHandler(400, "All fields are required!"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ name, email, password: hashedPassword, profileImage });

  try {
    const createdUser = await newUser.save();
    redis.del("allUsers");
    await redis.setex([email], 300, JSON.stringify(createdUser));
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
    const redishData = await redis.get(email);
    if (redishData) {
      const { password: redisPassword, ...rest } = JSON.parse(redishData);
      const isValidPasswordRedis = bcryptjs.compareSync(password, redisPassword);
      if (isValidPasswordRedis) {
        const token = jwt.sign({ id: rest._id, isAdmin: rest.isAdmin }, process.env.JWT_SECRET_KEY);
        return res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest);
      }
    }
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
