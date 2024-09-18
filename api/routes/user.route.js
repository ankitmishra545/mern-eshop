import express from "express";
import { test } from "../controller/user.controller.js";
import { logout } from "../controller/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.get("/logout", logout);

export default router;
