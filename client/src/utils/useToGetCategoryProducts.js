import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useToGetCategoryProducts = (categoryName) => {
  const [products, setProducts] = useState(null);

  const fetchCategoryProducts = async () => {
    const jsonResponse = await fetch(`/api/product/getCategoryProduct/${categoryName}`);
    const jsoData = await jsonResponse.json();
    setProducts(jsoData);
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  return products;
};

export default useToGetCategoryProducts;
