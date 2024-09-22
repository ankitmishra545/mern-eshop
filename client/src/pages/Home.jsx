import CategoryList from "../components/CategoryList";
import Banner from "../components/Banner";
import useGetPtoducts from "../utils/useGetProducts";
import HomeProductCard from "../components/HomeProductCard";
import useCountOfItemsInCart from "../utils/useCountOfItemsInCart";

const Home = () => {
  const products = useGetPtoducts();

  //recieve the quantity of each item's in the cart
  const countCartItems = useCountOfItemsInCart();

  if (products.length === 0) return <div>Loading...</div>;

  return (
    <div className="max-w-screen">
      {/*display all the category on homepage */}
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
