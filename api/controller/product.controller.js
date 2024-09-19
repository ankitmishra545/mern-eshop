import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

export const addProduct = async (req, res, next) => {
  const { category, brandName, productName, productImage, sellingPrice, originalPrice, description } = req.body;

  if ([productName, brandName, productImage.length, sellingPrice, originalPrice, category].includes("")) {
    next(errorHandler(400, "All fields are required!"));
  }

  const newProduct = new Product({
    productName,
    brandName,
    productImage,
    sellingPrice,
    originalPrice,
    category,
    description,
  });

  try {
    await newProduct.save();
    res.status(201).json("Successfully product added");
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(401, "Unauthorized access!"));

  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(401, "Unauthorized access!"));

  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json("Product has been successfully deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(401, "Unathorized access!"));

  try {
    await Product.findByIdAndUpdate(req.params.productId, req.body);
    res.status(201).json("Product updated succesfully!");
  } catch (error) {
    next(error);
  }
};
