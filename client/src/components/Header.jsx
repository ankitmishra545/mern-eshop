import logo from "../assets/eShop.jpg";
import Searchbar from "./Searchbar";
import { BsCart4 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { addToCart } from "../store/productSlice";
import { FaRegUserCircle } from "react-icons/fa";

// Component is header of page which contains logo and search input field and list of icons and buttons, from the search field we can search product, brands, category
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.product.cart);

  //onClick of logout button clearing the user and cart items from the store
  const handleLogout = async () => {
    dispatch(addUser({}));
    dispatch(addToCart(null));

    const jsonResponse = await fetch("http://localhost:3000/api/user/logout");
    const jsoData = await jsonResponse.json();
    navigate("/login");
  };

  //if user is not signed then after clicking on cart navigates user to login page, if not then staying on same page(because cart page not created)
  const handleClickCart = () => {
    if (user.name === null || user.name === undefined) {
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full shadow-lg bg-white">
      <div className="h-24 mx-auto md:px-5  flex items-center justify-between">
        <Link to="/">
          <div>
            <img src={logo} className="w-20 min-w-[50px]" />
          </div>
        </Link>
        <div className="hidden md:block">
          <Searchbar />
        </div>
        <ul className="flex md:min-w-80 gap-8 items-center p-3 justify-end">
          {user.isAdmin && (
            <li className="  text-sm font-bold p-1 rounded-lg underline">
              <Link to="/admin-panel/products">ADMIN</Link>
            </li>
          )}
          <li className="hidden md:block">
            {user?.profileImage ? (
              <img src={user.profileImage} className=" w-10 rounded-full border-[1px] border-gray-300" />
            ) : (
              <FaRegUserCircle size="32px" color="green" />
            )}
          </li>
          {!user.isAdmin && (
            <li>
              <div className="relative cursor-pointer" onClick={handleClickCart}>
                <BsCart4 size="24px" />
                <div className="bg-red-600 text-white rounded-full text-center absolute top-[-10px] right-[-10px] w-5 text-xs h-5">
                  {cart.length}
                </div>
              </div>
            </li>
          )}
          <li className="bg-bg-primary py-1 px-3 text-white rounded-lg cursor-pointer hover:opacity-80">
            {user?._id ? <button onClick={handleLogout}>Logout</button> : <Link to="/login">Login</Link>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
