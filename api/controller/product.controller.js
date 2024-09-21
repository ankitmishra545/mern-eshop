import { redis } from "../index.js";
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
    redis.del("allProducts");
    redis.del(`categoryProduct:${category}`);
    res.status(201).json("Successfully product added");
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const redishData = await redis.get("allProducts");
    if (redishData) {
      return res.status(200).json(JSON.parse(redishData));
    }
    const products = await Product.find();
    await redis.set("allProducts", JSON.stringify(products));
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(401, "Unauthorized access!"));

  try {
    const deletingItem = await Product.findById(req.params.productId);
    await Product.findByIdAndDelete(req.params.productId);
    redis.del("allProducts");
    redis.del(`categoryProduct:${deletingItem.category}`);
    res.status(200).json("Product has been successfully deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(401, "Unathorized access!"));

  try {
    await Product.findByIdAndUpdate(req.params.productId, req.body);
    redis.del("allProducts");
    redis.del(`categoryProduct:${req.body.category}`);
    redis.del(`productInfo:${req.params.productId}`);
    res.status(201).json("Product updated succesfully!");
  } catch (error) {
    next(error);
  }
};

export const getProductCategories = async (req, res, next) => {
  try {
    const redishData = await redis.get("productCategories");
    if (redishData) {
      return res.status(200).json(JSON.parse(redishData));
    }
    const categories = await Product.distinct("category");

    const productCategories = [];
    for (const category of categories) {
      const product = await Product.findOne({ category });
      if (product) {
        productCategories.push(product);
      }
    }
    await redis.set("productCategories", JSON.stringify(productCategories));
    res.status(200).json(productCategories);
  } catch (error) {
    next(error);
  }
};

export const getProductInfo = async (req, res, next) => {
  try {
    const redishData = await redis.get(`productInfo:${req.params.productId}`);
    if (redishData) {
      return res.status(200).json(JSON.parse(redishData));
    }
    const product = await Product.findById(req.params.productId);
    await redis.setex(`productInfo:${req.params.productId}`, 600, JSON.stringify(product));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getCategoryProducts = async (req, res, next) => {
  const { categoryName } = req.params;
  try {
    const redishData = await redis.get(`categoryProduct:${categoryName}`);
    if (redishData) {
      return res.status(200).json(JSON.parse(redishData));
    }
    const products = await Product.find({ category: categoryName });
    await redis.set(`categoryProduct:${categoryName}`, JSON.stringify(products));
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const searchProduct = async (req, res, next) => {
  try {
    const query = Object.entries(req.query);
    const value = query[0][0];

    const regex = new RegExp(value, "i", "g");

    const products = await Product.find({
      $or: [
        {
          productName: regex,
        },
        {
          brandName: regex,
        },
        {
          category: regex,
        },
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
