import CategoryList from "../components/CategoryList";
import Banner from "../components/Banner";
import useGetPtoducts from "../utils/useGetProducts";
import HomeProductCard from "../components/HomeProductCard";
import { useSelector } from "react-redux";

const Home = () => {
  const products = useGetPtoducts();

  const cart = useSelector((store) => store.product.cart);

  const countCartItems = cart.reduce((acc, value) => {
    if (acc[value]) {
      acc[value] = acc[value] + 1;
    } else {
      acc[value] = 1;
    }
    return acc;
  }, {});

  if (products.length === 0) return <div>Loading...</div>;

  return (
    <div className="">
      <CategoryList />
      <Banner />
      <div className="flex flex-wrap gap-4 justify-center pt-10">
        {products?.map((product) => {
          return <HomeProductCard key={product._id} productInfo={product} countOfItem={countCartItems[product._id]} />;
        })}
      </div>
    </div>
  );
};

export default Home;
