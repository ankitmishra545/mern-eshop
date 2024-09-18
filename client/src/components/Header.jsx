import logo from "../assets/eShop.jpg";
import Searchbar from "./Searchbar";
import { FcLike } from "react-icons/fc";
import { BsCart4 } from "react-icons/bs";
import { LiaUserSecretSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const HEADER_ICON = [
  {
    name: "wishlist",
    icon: <FcLike size="24px" />,
  },
  {
    name: "cart",
    icon: <BsCart4 size="24px" />,
  },
  {
    name: "user",
    icon: <LiaUserSecretSolid size="24px" />,
  },
];

const CATAGORIES = [
  "Korean Buety",
  "On the body",
  "In the body",
  "Around the body",
  "Bestsellers",
  "Brands",
  "Offers",
  "Watch & Shop",
];

const Header = () => {
  return (
    <div className="w-full shadow-lg bg-white">
      <div className="h-20 mx-auto px-5 flex items-center justify-between">
        <Link to="/">
          <img src={logo} className="w-16" />
        </Link>
        <div className="hidden md:block">
          <Searchbar />
        </div>
        <ul className="flex w-48 justify-between p-3">
          {HEADER_ICON.map((icon) => (
            <li key={icon.name} className="cursor-pointer">
              {icon.icon}
            </li>
          ))}
          <li className="bg-bg-primary py-1 px-3 text-white rounded-lg cursor-pointer hover:opacity-80">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
      {/* <div className="h-16 border-2 shadow-lg flex  justify-center items-center ">
        <ul className="flex">
          {CATAGORIES.map((category) => (
            <li key={category} className="py-2 px-3 cursor-pointer">
              {category}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Header;
