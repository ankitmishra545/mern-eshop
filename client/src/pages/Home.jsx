import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className=" min-h-[calc(100vh-145px)]  md:flex hidden">
      {/* <Sidebar />
      <Container /> */}
      Home
    </div>
  );
};

export default Home;
