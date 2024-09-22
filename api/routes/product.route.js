import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductCategories,
  getProductInfo,
  getCategoryProducts,
  searchProduct,
} from "../controller/product.controller.js";

const router = express.Router();

// this routing page contains all the products endpoints routed to corressponding route handler, some request which verifying whether the request made by admin or not
router.post("/addProduct", verifyToken, addProduct);
router.get("/getAllProducts", getAllProducts);
router.delete("/delete/:productId", verifyToken, deleteProduct);
router.put("/update/:productId", verifyToken, updateProduct);
router.get("/getProductCategories", getProductCategories);
router.get("/getProductInfo/:productId", getProductInfo);
router.get("/getCategoryProduct/:categoryName", getCategoryProducts);
router.get("/search", searchProduct);

export default router;
