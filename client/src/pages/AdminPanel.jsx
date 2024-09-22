import { HiArrowSmRight, HiOutlineUserGroup } from "react-icons/hi";
import { BsShop } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

//this component can recieve the all users and all products, and can modify the DB
const AdminPanel = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    const responseJson = await fetch("http://localhost:3000/api/user/logout");
    const jsoData = await responseJson.json();
    navigate("/login");
  };

  const isUser = user.name === null || user.name === undefined;

  useEffect(() => {
    //if user not login and try to acces this component the navigating to login page
    if (isUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)]  flex flex-col md:flex-row w-full">
      <div className=" md:max-w-60 items-center flex-col  bg-white">
        <nav className="grid p-4 text-xl">
          <Link to="users" className="flex items-center justify-center p-2 hover:underline">
            <HiOutlineUserGroup className="me-2" />
            Users
          </Link>
          <Link to="products" className="flex items-center justify-center p-2 hover:underline">
            <BsShop className="me-2" />
            Products
          </Link>
          <button className="hidden md:flex items-center justify-center p-2 hover:underline" onClick={handleLogout}>
            <HiArrowSmRight className="me-2" />
            Sign Out
          </button>
        </nav>
      </div>
      <div className="w-full">
        {/*this Outlet component loads whether admin requested the users or products */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
