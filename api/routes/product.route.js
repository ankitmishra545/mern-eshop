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

router.post("/addProduct", verifyToken, addProduct);
router.get("/getAllProducts", getAllProducts);
router.delete("/delete/:productId", verifyToken, deleteProduct);
router.put("/update/:productId", verifyToken, updateProduct);
router.get("/getProductCategories", getProductCategories);
router.get("/getProductInfo/:productId", getProductInfo);
router.get("/getCategoryProduct/:categoryName", getCategoryProducts);
router.get("/search", searchProduct);
// router.post("/getCartItems", getCartItems);

export default router;
