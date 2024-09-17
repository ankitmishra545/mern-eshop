import shop from "../assets/3794707.jpg";
import { FaRegUserCircle } from "react-icons/fa";
import FormInput from "../helper/FormInput";
import { useState } from "react";
import validateFormInput from "../utils/validate";

const Login = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const handleChange = (e) => {
    setErrorMessage("");
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const message = validateFormInput(userInfo);
    if (message) {
      setErrorMessage(message);
      return;
    }
    let fetchdata;
    if (!hasAccount) {
      fetchdata = await fetch("/shop/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
    } else {
      fetchdata = await fetch("/shop/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
    }

    const data = await fetchdata.json();
    if (data.success === false) {
      setErrorMessage(data.message);
      return;
    }
    setHasAccount(true);
    alert(data);
  };

  return (
    <div className="flex p-10 border-2 ">
      <div className="w-80 p-1 flex flex-col items-center">
        <FaRegUserCircle size="40px" color="#BB1C6B" />
        <p className="h-2 text-red-600 py-2 text-sm font-serif">{errorMessage}</p>
        <form onSubmit={handleClick}>
          {!hasAccount && (
            <FormInput
              name="name"
              label="Name"
              placeholder="Enter your name"
              type="text"
              onChange={handleChange}
              value={userInfo.name}
            />
          )}
          <FormInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="text"
            onChange={handleChange}
            value={userInfo.email}
          />
          <FormInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={handleChange}
            value={userInfo.password}
          />
          <button className="bg-bg-primary text-white font-bold text-lg py-3 mt-3 w-full">
            {hasAccount ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="pt-2 text-sm">
          {hasAccount ? "Don't have account ?" : "Have an account ?"}{" "}
          <span
            className="text-bg-primary hover:underline text-base hover:cursor-pointer"
            onClick={() => {
              setHasAccount(!hasAccount);
              setUserInfo({});
            }}
          >
            {hasAccount ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
      <img src={shop} className="w-80" />
    </div>
  );
};

export default Login;
