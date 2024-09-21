import { HiArrowSmRight, HiOutlineUserGroup } from "react-icons/hi";
import { BsShop } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AdminPanel = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    const responseJson = await fetch("/api/user/logout");
    const jsoData = await responseJson.json();
    navigate("/login");
  };

  const isUser = user.name === null || user.name === undefined;

  useEffect(() => {
    if (isUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-80px)]  flex w-full">
      <div className=" max-w-60 items-center flex-col bg-white">
        <nav className="grid p-4 text-xl">
          <Link to="users" className="flex items-center p-2 hover:underline">
            <HiOutlineUserGroup className="me-2" />
            Users
          </Link>
          <Link to="products" className="flex items-center p-2 hover:underline">
            <BsShop className="me-2" />
            Products
          </Link>
          <button className="flex items-center p-2 hover:underline" onClick={handleLogout}>
            <HiArrowSmRight className="me-2" />
            Sign Out
          </button>
        </nav>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
