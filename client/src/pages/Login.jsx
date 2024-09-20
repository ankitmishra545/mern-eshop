import shop from "../assets/3794707.jpg";
import { FaRegUserCircle } from "react-icons/fa";
import FormInput from "../helper/FormInput";
import { useState } from "react";
import { validateEmailPasswordInput } from "../utils/validate";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setErrorMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    const { email, password } = formData;
    e.preventDefault();
    const message = validateEmailPasswordInput({ email, password });
    if (message) {
      setErrorMessage(message);
      return;
    }
    let jsonResponse = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const jsoData = await jsonResponse.json();
    if (jsoData.success === false) {
      setErrorMessage(jsoData.message);
      return;
    }
    dispatch(addUser(jsoData));
    if (jsoData.isAdmin) {
      navigate("/admin-panel");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full pt-3 flex justify-center md:p-10">
      <div className="w-full p-3 flex flex-col items-center md:w-80 lg:w-96 bg-white">
        <FaRegUserCircle size="40px" color="#BB1C6B" />
        <p className="h-2 text-red-600 py-2 text-sm font-serif">{errorMessage}</p>
        <form onSubmit={handleClick} className="w-full px-2">
          <FormInput name="email" label="Email" placeholder="Enter your email" type="text" onChange={handleChange} />
          <FormInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={handleChange}
          />
          <button className="bg-bg-primary text-white font-bold text-lg py-3 mt-3 w-full">Log In</button>
        </form>
        <p className="pt-2 text-sm w-full">
          Don't have account ?{" "}
          <span
            className="text-bg-primary hover:underline text-base hover:cursor-pointer"
            onClick={() => {
              setFormData({});
            }}
          >
            <Link to="/sign-up">Sign Up</Link>
          </span>
        </p>
      </div>
      <img src={shop} className="hidden md:block md:w-80 lg:w-96 " />
    </div>
  );
};

export default Login;
