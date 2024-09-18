import { HiArrowSmRight, HiChartPie, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { BsShop } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";
const TABS = [
  {
    tabName: "Dashboard",
    icon: <HiChartPie />,
    link: "dashboard",
  },
  {
    tabName: "Profile",
    icon: <HiUser />,
    link: "profile",
  },
  {
    tabName: "Users",
    icon: <HiOutlineUserGroup />,
    link: "users",
  },
  {
    tabName: "Products",
    icon: <BsShop />,
    link: "products",
  },
  {
    tabName: "Sign Out",
    icon: <HiArrowSmRight />,
    link: "signin",
  },
];

const AdminPanel = () => {
  return (
    <div className=" min-h-[calc(100vh-145px)] md:flex hidden">
      <div className="bg-gray-300 min-h-full w-60 items-center flex-col">
        <ul className="grid p-4">
          {TABS.map((tab) => (
            <li key={tab.tabName} className="text-lg text-bg-primary p-1 cursor-pointer">
              <Link to={tab.link}>
                <div className="flex p-1 items-center hover:bg-bg-primary hover:text-white">
                  <div>{tab.icon}</div>
                  <div className="ps-2">{tab.tabName}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
