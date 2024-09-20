import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import displayINRCurrency from "../utils/displayCurrency";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import UploadProduct from "./UploadProduct";
import { MdOutlineUpdate } from "react-icons/md";

const ProductCard = ({ productInfo }) => {
  const { _id: productId, productName, brandName, createdAt, productImage, originalPrice, sellingPrice } = productInfo;

  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState(false);

  const handleDeleteProduct = async (id) => {
    const jsonResponse = await fetch(`/api/product/delete/${id}`, {
      method: "DELETE",
    });

    const jsoData = await jsonResponse.json();
    if (jsoData.success === false) return;
    dispatch(fetchProducts());
  };

  return (
    <div className="flex gap-2 p-3 cursor-pointer justify-center w-[270px] h-[250px] rounded-lg  shadow-xl  bg-white">
      <div className=" w-6/12 p-1">
        <img src={productImage[0].imagePath} alt="product-image" className="w-full h-full " />
      </div>
      <div className="flex flex-col w-6/12 py-3">
        <h2 className="text-lg font-semibold w-32 line-clamp-2">{productName}</h2>
        <p>{brandName}</p>
        <div className="flex flex-col">
          <p className="text-green-600">{displayINRCurrency(sellingPrice)}</p>
          <del className="text-gray-600">{displayINRCurrency(originalPrice)}</del>
        </div>
        <div className="flex items-center gap-1 pt-1 ">
          <h3 className="font-semibold">
            <MdOutlineUpdate color="blue" />
          </h3>
          <p className="text-xs">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
        <div className="pt-3">
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
