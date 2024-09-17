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

  const handleClick = () => {
    const message = validateFormInput(userInfo);
    setErrorMessage(message);
  };

  return (
    <div className="flex p-10 border-2 ">
      <div className="w-80 p-1 flex flex-col items-center">
        <FaRegUserCircle size="40px" color="#BB1C6B" />
        <p className="h-2 text-red-600 py-2 text-sm font-serif">{errorMessage}</p>
        <div>
          {!hasAccount && (
            <FormInput name="name" label="Name" placeholder="Enter your name" type="text" onChange={handleChange} />
          )}
          <FormInput name="email" label="Email" placeholder="Enter your email" type="text" onChange={handleChange} />
          <FormInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={handleChange}
          />
          <button className="bg-bg-primary text-white font-bold text-lg py-3 mt-3 w-full" onClick={handleClick}>
            {hasAccount ? "Login" : "Sign Up"}
          </button>
        </div>
        <p className="pt-2 text-sm">
          {hasAccount ? "Don't have account ?" : "Have an account ?"}{" "}
          <span
            className="text-bg-primary hover:underline text-base hover:cursor-pointer"
            onClick={() => setHasAccount(!hasAccount)}
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
