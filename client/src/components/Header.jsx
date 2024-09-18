import logo from "../assets/eShop.jpg";
import Searchbar from "./Searchbar";
import { FcLike } from "react-icons/fc";
import { BsCart4 } from "react-icons/bs";
import { LiaUserSecretSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../store/userSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    dispatch(addUser(null));

    const jsonResponse = await fetch("/api/user/logout");
    const jsoData = await jsonResponse.json();
    console.log(jsoData);
    navigate("/login");
  };
  return (
    <div className="w-full shadow-lg bg-white">
      <div className="h-20 mx-auto px-5 flex items-center justify-between">
        <Link to="/">
          <img src={logo} className="w-16" />
        </Link>
        <div className="hidden md:block">
          <Searchbar />
        </div>
        <ul className="flex w-48 items-center justify-between p-3">
          {/* <li>
            <FcLike size="24px" />
          </li> */}
          <li>
            {user?.profileImage ? (
              <img src={user.profileImage} className=" w-10 rounded-full border-[1px] border-gray-300" />
            ) : (
              <LiaUserSecretSolid size="24px" />
            )}
          </li>
          <li>
            <BsCart4 size="24px" />
          </li>
          <li className="bg-bg-primary py-1 px-3 text-white rounded-lg cursor-pointer hover:opacity-80">
            {user?._id ? <button onClick={handleLogout}>Logout</button> : <Link to="/login">Login</Link>}
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
