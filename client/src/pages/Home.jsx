import Container from "../components/Container";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className=" min-h-[calc(100vh-145px)] bg-red-200 md:flex hidden">
      <Sidebar />
      <Container />
    </div>
  );
};

export default Home;
