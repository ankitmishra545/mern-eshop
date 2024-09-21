import logo from "../assets/eShop.jpg";
import Searchbar from "./Searchbar";
import { FcLike } from "react-icons/fc";
import { BsCart4 } from "react-icons/bs";
import { LiaUserSecretSolid } from "react-icons/lia";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { addToCart } from "../store/productSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.product.cart);

  const handleLogout = async () => {
    dispatch(addUser({}));
    dispatch(addToCart(null));

    const jsonResponse = await fetch("/api/user/logout");
    const jsoData = await jsonResponse.json();
    navigate("/login");
  };

  const handleClickCart = () => {
    if (user.name === null || user.name === undefined) {
      navigate("/login");
    } else {
      navigate("cart");
    }
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
          <li>
            {user?.profileImage ? (
              <img src={user.profileImage} className=" w-10 rounded-full border-[1px] border-gray-300" />
            ) : (
              <LiaUserSecretSolid size="24px" />
            )}
          </li>
          <li>
            <div className="relative cursor-pointer" onClick={handleClickCart}>
              <BsCart4 size="24px" />
              <div className="bg-red-600 text-white rounded-full text-center absolute top-[-10px] right-[-10px] w-5 text-xs h-5">
                {cart.length}
              </div>
            </div>
          </li>
          <li className="bg-bg-primary py-1 px-3 text-white rounded-lg cursor-pointer hover:opacity-80">
            {user?._id ? <button onClick={handleLogout}>Logout</button> : <Link to="/login">Login</Link>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
