import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { addProduct } from "../controller/product.controller.js";

const router = express.Router();

router.post("/addProduct", verifyToken, addProduct);

export default router;
