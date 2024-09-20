import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa6";
import displayINRCurrency from "../utils/displayCurrency";
import HomeProductCard from "../components/HomeProductCard";
import useCountOfItemsInCart from "../utils/useCountOfItemsInCart";
import { useDispatch } from "react-redux";
import { addToCart, removeItemFromCart } from "../store/productSlice";

const ProductInfo = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState(null);
  const cartCountItem = useCountOfItemsInCart();

  const fetchProductInfo = async () => {
    const jsonResponse = await fetch(`/api/product/getProductInfo/${productId}`);
    const jsoData = await jsonResponse.json();
    setProduct(jsoData);
  };

  const fetchCategoryProducts = async () => {
    const jsonResponse = await fetch(`/api/product/getCategoryProduct/${product.category}`);
    const jsoData = await jsonResponse.json();
    setCategoryProducts(jsoData.filter((el) => el._id !== product._id));
  };

  const handleAddtoCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(productId));
  };

  const handleRemoveItem = (e) => {
    e.stopPropagation();
    dispatch(removeItemFromCart(productId));
  };

  useEffect(() => {
    fetchProductInfo();
  }, []);

  useEffect(() => {
    if (product) {
      fetchCategoryProducts();
    }
  }, [product]);

  if (!product) return <div>Loading...</div>;

  const { productImage, productName, brandName, category, originalPrice, sellingPrice, description } = product;

  return (
    <div className="m-10 bg-white w-full">
      <div className="w-full flex gap-5">
        <div className="  min-w-80 min-h-80 w-4/12 flex items-center justify-center">
          <img src={productImage[0].imagePath} alt="product-image" />
        </div>
        <div className="p-5 flex flex-col gap-2 ">
          <h2 className=" bg-bg-primary w-fit text-white font-semibold px-4 py-2 rounded-lg">{brandName}</h2>
          <h3 className="text-2xl font-bold">{productName}</h3>
          <p className="text-gray-500 text-lg">{category}</p>
          <div className="flex text-bg-primary">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <div className="flex gap-2">
            <p className="text-lg text-green-700 font-semibold">{displayINRCurrency(sellingPrice)}</p>
            <del className="text-lg text-gray-700 font-semibold">{displayINRCurrency(originalPrice)}</del>
          </div>
          {cartCountItem[productId] ? (
            <div className="max-w-44 flex gap-2 items-center p-1 bg-green-600 rounded-lg text-white justify-center h-8 mt-3">
              <button onClick={handleAddtoCart} className=" w-4/12 flex justify-center  h-full items-center">
                <FaPlus />
              </button>
              <p className="bg-slate-100 text-black w-4/12 p-1 font-bold text-center text-lg">
                {cartCountItem[productId]}
              </p>
              <button onClick={handleRemoveItem} className="w-4/12 flex justify-center h-full items-center">
                <FaMinus />
              </button>
            </div>
          ) : (
            <div className="pt-3 max-w-44">
              <button className="bg-red-600 p-1 w-full text-white rounded-lg" onClick={handleAddtoCart}>
                Add to cart
              </button>
            </div>
          )}
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="px-3 py-5">
        <h2 className="text-xl font-bold ">Other similar products:</h2>
        {categoryProducts === null || categoryProducts.length === 0 ? (
          <div className="py-5">No related items</div>
        ) : (
          <div>
            {categoryProducts?.map((product) => (
              <HomeProductCard key={product._id} productInfo={product} countOfItem={cartCountItem[product._id]} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
