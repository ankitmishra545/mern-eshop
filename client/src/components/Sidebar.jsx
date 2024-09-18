import { HiArrowSmRight, HiChartPie, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
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

const Sidebar = () => {
  return (
    <div className="w-44 ps-4 pt-5 bg-[#F9FAFB] min-h-full">
      <ul>
        {TABS.map((tab) => (
          <li className="text-lg text-bg-primary p-1 cursor-pointer">
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
  );
};

export default Sidebar;
