import { useEffect, useState } from "react";

// returns products based on the category
const useToGetCategoryProducts = (categoryName) => {
  const [products, setProducts] = useState(null);

  const fetchCategoryProducts = async () => {
    const jsonResponse = await fetch(`http://localhost:3000/api/product/getCategoryProduct/${categoryName}`);
    const jsoData = await jsonResponse.json();
    setProducts(jsoData);
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  return products;
};

export default useToGetCategoryProducts;
