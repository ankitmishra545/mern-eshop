import { redis } from "../index.js";
import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

//adding the product into db
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
    // storing product
    await newProduct.save();
    // after adding product, then cached result of allProducts, categoryProducts:"",becomes invalid so clearing that cached results
    redis.del("allProducts");
    redis.del(`categoryProduct:${category}`);
    res.status(201).json("Successfully product added");
  } catch (error) {
    next(error);
  }
};

// getting all products
export const getAllProducts = async (req, res, next) => {
  try {
    // checking cach for the request of allproducts if avialable the sends the response
    const redishData = await redis.get("allProducts");
    if (redishData) {
      return res.status(200).json(JSON.parse(redishData));
    }
    // no cache results then finding all product and caching the result with key all products in redis
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
    // deleting the product
    const deletingItem = await Product.findById(req.params.productId);
    await Product.findByIdAndDelete(req.params.productId);
    // after deleting the folllowing cached results becomes invalid so deleting from cache
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
    // updating the product
    await Product.findByIdAndUpdate(req.params.productId, req.body);
    // after updating the folllowing cached results becomes invalid so deleting from cache
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
    // checking the cache from redish, if avalable then sends response
    const redishData = await redis.get("productCategories");
    if (redishData) {
      return res.status(200).json(JSON.parse(redishData));
    }
    // following codes finding the distinct category from DB
    const categories = await Product.distinct("category");

    const productCategories = [];
    // adding one item from each category and then adding to cache after that sendsresponse to client
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
    // checking the cache from redish, if avialable then sends response
    const redishData = await redis.get(`productInfo:${req.params.productId}`);
    if (redishData) {
      return res.status(200).json(JSON.parse(redishData));
    }
    // finds the product and adding product information into cache for 600 seonds
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
    // checking the cache from redish, if avialable then sends response
    const redishData = await redis.get(`categoryProduct:${categoryName}`);
    if (redishData) {
      return res.status(200).json(JSON.parse(redishData));
    }
    // finds all items for the requested category and then caching that results
    const products = await Product.find({ category: categoryName });
    await redis.set(`categoryProduct:${categoryName}`, JSON.stringify(products));
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// this api endpoints searching from DB based on query(of category, productname, and brand name) and sends resonse to client
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
