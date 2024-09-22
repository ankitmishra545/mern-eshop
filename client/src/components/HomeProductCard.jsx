import displayINRCurrency from "../utils/displayCurrency";
import { addToCart, removeItemFromCart } from "../store/productSlice";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// this reusable component is card of product which recieves two props, one prop is product and other one contains the quantity of this product which are in cart
const HomeProductCard = ({ productInfo, countOfItem }) => {
  const { _id: productId, productName, brandName, productImage, originalPrice, sellingPrice } = productInfo;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddtoCart = (e) => {
    e.stopPropagation(); // stoping the propagation as parent is clickable that redirects to the product information page
    dispatch(addToCart(productId));
  };

  const handleRemoveItem = (e) => {
    e.stopPropagation(); // stoping the propagation as parent is clickable that redirects to the product information page
    dispatch(removeItemFromCart(productId));
  };

  const handleProductClick = () => {
    navigate(`/product-info/${productId}`); // redirecting to  product information page
  };

  return (
    <div
      onClick={handleProductClick}
      className="flex gap-2 p-3 cursor-pointer justify-center w-[250px] h-[250px] rounded-lg  shadow-xl  bg-white"
    >
      <div className=" w-6/12 p-1">
        <img src={productImage[0].imagePath} alt="product-image" className="w-full h-full " />
      </div>
      <div className="flex flex-col gap-1 w-6/12 py-3">
        <h2 className="text-lg font-semibold w-32 line-clamp-2">{productName}</h2>
        <p>{brandName}</p>
        <div className="flex flex-col gap-2">
          <p className="text-green-600">{displayINRCurrency(sellingPrice)}</p>
          {/*displayINRCurrency function converts the number value into INR*/}
          <del className="text-gray-600">{displayINRCurrency(originalPrice)}</del>
        </div>
        {countOfItem ? ( // if this product in cart then display these buttons, '+'increments item in cart and "-"decrements item from cart
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
          //displaying this button if this product not in the cart
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
