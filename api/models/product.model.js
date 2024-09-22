import mongoose from "mongoose";

// model for creating the product
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productImage: {
      type: Array,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "One of the best product in this category!",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

export default Product;
