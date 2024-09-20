import { useSelector } from "react-redux";
import CategoryList from "../components/CategoryList";

const Home = () => {
  // const user = useSelector((state) => state.user);
  return (
    // <div className=" w-screen min-h-[calc(100vh-145px)]  md:flex hidden">
    <div>
      <CategoryList />
    </div>
    // </div>
  );
};

export default Home;
