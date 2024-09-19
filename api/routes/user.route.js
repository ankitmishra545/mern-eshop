import express from "express";
import { test, logout, getAllUsers, deleteUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/test", test);
router.get("/logout", logout);
router.get("/getAllUsers", verifyToken, getAllUsers);
router.delete("/delete/:userId", verifyToken, deleteUser);

export default router;
