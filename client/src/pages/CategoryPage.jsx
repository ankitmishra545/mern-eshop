import { useEffect, useState } from "react";
import HomeProductCard from "../components/HomeProductCard";
import { useParams } from "react-router-dom";
import useCountOfItemsInCart from "../utils/useCountOfItemsInCart";

const CategoryPage = () => {
  const [products, setProducts] = useState(null);

  const { categoryName } = useParams();

  const countCartItems = useCountOfItemsInCart();

  const fetchCategoryProducts = async () => {
    const jsonResponse = await fetch(`/api/product/getCategoryProduct/${categoryName}`);
    const jsoData = await jsonResponse.json();
    setProducts(jsoData);
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  if (products === null) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-wrap gap-5 p-10">
      {products.map((product) => {
        return <HomeProductCard key={product._id} productInfo={product} countOfItem={countCartItems[product._id]} />;
      })}
    </div>
  );
};

export default CategoryPage;
