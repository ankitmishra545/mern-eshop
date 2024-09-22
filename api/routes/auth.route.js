import express from "express";
import { signup } from "../controller/auth.controller.js";
import { signin } from "../controller/auth.controller.js";

const router = express.Router();

// this routing page contains where authentication is required and routed to corressponding route handler
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
