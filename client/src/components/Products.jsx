import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import UploadProduct from "./UploadProduct";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../store/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const [showUploadProduct, setShowUploadProduct] = useState(false);
  const products = useSelector((state) => state.product.products);
  const fetchProduct = useSelector((state) => state.product.shouldFetch);

  const handleCloseUploadProduct = () => {
    setShowUploadProduct(false);
  };

  const fetchAllProducts = async () => {
    const jsonResponse = await fetch("/api/product/getAllProducts");
    const jsoData = await jsonResponse.json();
    dispatch(addProduct(jsoData));
  };

  useEffect(() => {
    fetchAllProducts();
  }, [fetchProduct]);

  return (
    <div className="px-4 pt-3">
      <div className="bg-white flex justify-between items-center py-2 px-4">
        <h3 className="font-bold text-lg">Products</h3>
        <button
          className="bg-green-600 p-2 rounded-lg text-white text-sm hover:opacity-80"
          onClick={() => setShowUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>
      <div className="py-2 flex gap-3 flex-wrap overflow-y-scroll h-full">
        {products?.map((product) => {
          return <ProductCard key={product._id} productInfo={product} />;
        })}
      </div>
      {showUploadProduct && (
        <div className="py-2">
          <UploadProduct onClose={handleCloseUploadProduct} />
        </div>
      )}
    </div>
  );
};

export default Products;
