import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import cookieParser from "cookie-parser";
import Redis from "ioredis";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

export const redis = new Redis({
  host: "redis-16122.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
  port: 16122,
  password: "feDEuQUb9ACTKNKeePNy24BJ9OWIjkuZ",
});

redis.on("connect", () => {
  console.log("redis connected succesfully");
});

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("mongoDB is connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is listening the port 3000!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
