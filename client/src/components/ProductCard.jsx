import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import displayINRCurrency from "../utils/displayCurrency";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import UploadProduct from "./UploadProduct";

const ProductCard = ({ productInfo }) => {
  const { _id: productId, productName, brandName, createdAt, productImage, originalPrice, sellingPrice } = productInfo;

  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState(false);
  const products = useSelector((store) => store.product);

  const handleDeleteProduct = async (id) => {
    const jsonResponse = await fetch(`/api/product/delete/${id}`, {
      method: "DELETE",
    });

    const jsoData = await jsonResponse.json();
    if (jsoData.success === false) return;
    dispatch(fetchProducts());
  };

  return (
    <div className="bg-white p-2 shadow-lg flex flex-col items-center">
      <div className="h-44 w-44 flex justify-center items-center ">
        <img src={productImage[0].imagePath} className="w-full rounded-lg" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold">{productName}</p>
        <p className="text-sm">{brandName}</p>
        <div className="flex gap-2">
          <h3 className="font-semibold">Price: </h3>
          <del className="text-gray-600 font-bold">{displayINRCurrency(originalPrice)}</del>
          <p className="text-green-700 font-semibold">{displayINRCurrency(sellingPrice)}</p>
        </div>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold">Added on:</h3>
          <p className="text-sm">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className=" w-full flex pt-3 justify-between">
        <div
          className="rounded-lg p-2 bg-green-600 cursor-pointer flex text-white items-center text-xs gap-1 hover:opacity-80"
          onClick={() => setEditProduct(true)}
        >
          <CiEdit color="white" />
          <span>Edit</span>
        </div>
        <div
          className="rounded p-1 bg-red-600 cursor-pointer flex items-center text-white text-xs gap-1 hover:opacity-80"
          onClick={() => handleDeleteProduct(productId)}
        >
          <MdDelete color="white" />
          <span>Delete</span>
        </div>
      </div>
      {editProduct && (
        <UploadProduct
          onClose={() => {
            setEditProduct(false);
          }}
          editProductInfo={productInfo}
        />
      )}
    </div>
  );
};

export default ProductCard;
