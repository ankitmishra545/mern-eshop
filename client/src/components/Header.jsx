import logo from "../assets/eShop.jpg";
import Searchbar from "./Searchbar";
import { FcLike } from "react-icons/fc";
import { BsCart4 } from "react-icons/bs";
import { LiaUserSecretSolid } from "react-icons/lia";

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
    <>
      <div className="h-20 flex items-center justify-around border-gray-100">
        <img src={logo} className="w-16" />
        <Searchbar />
        <ul className="flex w-48 justify-between p-3">
          {HEADER_ICON.map((icon) => (
            <li key={icon.name} className="cursor-pointer">
              {icon.icon}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-16 border-2 shadow-lg flex  justify-center items-center ">
        <ul className="flex">
          {CATAGORIES.map((category) => (
            <li key={category} className="py-2 px-3 cursor-pointer">
              {category}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;
