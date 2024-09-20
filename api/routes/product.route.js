import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductCategories,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/addProduct", verifyToken, addProduct);
router.get("/getAllProducts", verifyToken, getAllProducts);
router.delete("/delete/:productId", verifyToken, deleteProduct);
router.put("/update/:productId", verifyToken, updateProduct);
router.get("/getProductCategories", getProductCategories);

export default router;
