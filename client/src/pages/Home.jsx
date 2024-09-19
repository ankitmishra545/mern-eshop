import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return <div className=" min-h-[calc(100vh-145px)]  md:flex hidden">Home</div>;
};

export default Home;
