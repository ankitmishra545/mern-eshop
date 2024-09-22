import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// this custom hook subscribed a store state when any component updates the product then that component toggle this state by which this hooks again fetch the products and returns it
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
