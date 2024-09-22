import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeProductCard from "../components/HomeProductCard";
import useCountOfItemsInCart from "../utils/useCountOfItemsInCart";

// this page opens when something searched in header
const SearchPage = () => {
  const location = useLocation();

  const [products, setProducts] = useState([]);

  // customhook returns quantity of items
  const countCartItems = useCountOfItemsInCart();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get("searchTerm");

    // fetching the search result
    const fetchSearchedResults = async () => {
      const jsonResponse = await fetch(`http://localhost:3000/api/product/search?${searchTermFromURL}`);
      const jsoData = await jsonResponse.json();
      if (jsoData.success === false) return;
      setProducts(jsoData);
    };
    fetchSearchedResults();
  }, [location.search]);

  return (
    <div className="w-full flex flex-col flex-wrap gap-5 p-10">
      <h2 className="text-xl font-bold">Your searched Result:</h2>
      <div className="w-full flex flex-wrap gap-5">
        {products.map((product) => {
          return <HomeProductCard key={product._id} productInfo={product} countOfItem={countCartItems[product._id]} />;
        })}
      </div>
    </div>
  );
};

export default SearchPage;
