import { useState } from "react";
import ProductCard from "./ProductCard";
import UploadProduct from "./UploadProduct";

const Products = () => {
  const [showUploadProduct, setShowUploadProduct] = useState(false);

  const handleCloseUploadProduct = () => {
    setShowUploadProduct(false);
  };
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
      {/* <div className="py-2">
        <ProductCard />
      </div> */}
      {showUploadProduct && (
        <div className="py-2">
          <UploadProduct onClose={handleCloseUploadProduct} />
        </div>
      )}
    </div>
  );
};

export default Products;
