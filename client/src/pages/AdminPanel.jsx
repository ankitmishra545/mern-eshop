import { HiArrowSmRight, HiChartPie, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { BsShop } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const responseJson = await fetch("/api/user/logout");
    const jsoData = await responseJson.json();
    navigate("/login");
  };

  return (
    <div className="min-h-[calc(100vh-80px)]  flex w-full">
      <div className=" max-w-60 items-center flex-col bg-white">
        <nav className="grid p-4 text-xl font-semibold">
          <Link to="dashboard" className="flex items-center p-2 hover:bg-bg-primary hover:text-white">
            <HiChartPie className="me-2" />
            Dashbaoard
          </Link>
          <Link to="users" className="flex items-center p-2 hover:bg-bg-primary hover:text-white">
            <HiOutlineUserGroup className="me-2" />
            Users
          </Link>
          <Link to="products" className="flex items-center p-2 hover:bg-bg-primary hover:text-white">
            <BsShop className="me-2" />
            Products
          </Link>
          <button className="flex items-center p-2 hover:bg-bg-primary hover:text-white" onClick={handleLogout}>
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
