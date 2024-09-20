import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGetPtoducts = () => {
  const fetchProduct = useSelector((state) => state.product.shouldFetch);
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    const jsonResponse = await fetch("/api/product/getAllProducts");
    const jsoData = await jsonResponse.json();
    setProducts(jsoData);
  };

  useEffect(() => {
    fetchAllProducts();
  }, [fetchProduct]);

  return products;
};

export default useGetPtoducts;
