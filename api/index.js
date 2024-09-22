import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import cookieParser from "cookie-parser";
import Redis from "ioredis";
import cors from "cors";

//main file of server which serving the request made from client
const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use(cors());

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

//connecting server to redis
redis.on("connect", () => {
  console.log("redis connected succesfully");
});

//connecting server to mongodb
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("mongoDB is connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

//listening the request created to port 3000
app.listen(3000, () => {
  console.log("server is listening the port 3000!");
});

// routes when matches to any endpoints then navigates to corresponding router handler
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

// if any error occured by any endpoints, then this middlewware handle and sends reponse back to user with error and message
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
