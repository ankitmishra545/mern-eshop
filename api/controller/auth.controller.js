import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { redis } from "../index.js";

// this route handler recives the information from client and then adding to DB, if no errors
export const signup = async (req, res, next) => {
  const { name, email, password, profileImage } = req.body;

  if ([name, email, password].includes("")) {
    next(errorHandler(400, "All fields are required!"));
  }

  // encrypting the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  //creating new users
  const newUser = new User({ name, email, password: hashedPassword, profileImage });

  try {
    // adding the user into databse
    const createdUser = await newUser.save();
    // if new user created then deleting the cached users
    redis.del("allUsers");
    // caching the user for 300 seconds, because recently signed up user may signin
    await redis.setex([email], 300, JSON.stringify(createdUser));
    res.status(201).json("succesfully signedup");
  } catch (error) {
    next(error);
  }
};

// this route handler recives the information from client and then verifies the details, if no errors
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if ([email, password].includes("")) {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    // getting the result from cache if available then verifies the password and tokens, if valid then return the response
    const redishData = await redis.get(email);
    if (redishData) {
      const { password: redisPassword, ...rest } = JSON.parse(redishData);
      const isValidPasswordRedis = bcryptjs.compareSync(password, redisPassword);
      if (isValidPasswordRedis) {
        const token = jwt.sign({ id: rest._id, isAdmin: rest.isAdmin }, process.env.JWT_SECRET_KEY);
        return res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest);
      }
    }

    // if user is not in cache then runs for mongoDB, here finding the user using the email
    const user = await User.findOne({ email });

    if (!user) {
      // returns if no email is existed in DB
      next(errorHandler(404, "User not found!"));
    }

    const isValidPassword = bcryptjs.compareSync(password, user.password);

    if (!isValidPassword) {
      next(401, "Invalid credentials entered!");
    }

    // verifiying the token
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);

    // extracting the password
    const { password: pass, ...rest } = user._doc;

    res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest);
  } catch (error) {
    next(error);
  }
};
