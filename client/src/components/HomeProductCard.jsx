import displayINRCurrency from "../utils/displayCurrency";
import { addToCart, removeItemFromCart } from "../../store/productSlice";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";

const HomeProductCard = ({ productInfo, countOfItem }) => {
  const { _id: productId, productName, brandName, productImage, originalPrice, sellingPrice } = productInfo;

  const dispatch = useDispatch();

  const handleAddtoCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(productId));
  };

  const handleRemoveItem = (e) => {
    e.stopPropagation();
    dispatch(removeItemFromCart(productId));
  };

  return (
    <div className="flex gap-2 p-3 cursor-pointer justify-center w-[250px] h-[250px] rounded-lg  shadow-xl  bg-white">
      <div className=" w-6/12 p-1">
        <img src={productImage[0].imagePath} alt="product-image" className="w-full h-full " />
      </div>
      <div className="flex flex-col gap-1 w-6/12 py-3">
        <h2 className="text-lg font-semibold w-32 line-clamp-2">{productName}</h2>
        <p>{brandName}</p>
        <div className="flex flex-col gap-2">
          <p className="text-green-600">{displayINRCurrency(sellingPrice)}</p>
          <del className="text-gray-600">{displayINRCurrency(originalPrice)}</del>
        </div>
        {countOfItem ? (
          <div className="w-full flex gap-2 items-center p-1 bg-green-600 rounded-lg text-white justify-center h-8 mt-3">
            <button onClick={handleAddtoCart} className=" w-4/12 flex justify-center  h-full items-center">
              <FaPlus />
            </button>
            <p className="bg-slate-100 text-black w-4/12 p-1 font-bold text-center text-lg">{countOfItem}</p>
            <button onClick={handleRemoveItem} className="w-4/12 flex justify-center h-full items-center">
              <FaMinus />
            </button>
          </div>
        ) : (
          <div className="pt-3">
            <button className="bg-red-600 p-1 w-full text-white rounded-lg" onClick={handleAddtoCart}>
              Add to cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProductCard;
