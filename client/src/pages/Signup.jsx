import { FaRegUserCircle } from "react-icons/fa";
import shop from "../assets/3794707.jpg";
import FormInput from "../helper/FormInput";
import { useState } from "react";
import { validateEmailPasswordInput, validateNameInput } from "../utils/validate";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setErrorMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    if (confirmPassword !== password) return setErrorMessage("Password is not Matching!");
    const message = validateEmailPasswordInput({ email, password });
    const nameValidationMessage = validateNameInput(name);
    if (message || nameValidationMessage) {
      setErrorMessage("Please fill all details!");
      return;
    }
    const jsonResponse = await fetch("/shop/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const jsoData = await jsonResponse.json();
    if (jsoData.success === false) {
      setErrorMessage(jsoData.message);
      return;
    }
    navigate("/");
  };

  return (
    <div className="w-full pt-3 flex justify-center md:p-10">
      <div className="w-full p-3 flex flex-col items-center md:w-80 lg:w-96 bg-white">
        <FaRegUserCircle size="40px" color="#BB1C6B" />
        <p className="h-2 text-red-600 py-2 text-sm font-serif">{errorMessage}</p>
        <form onSubmit={handleClick} className="w-full px-2">
          <FormInput name="name" label="Name" placeholder="Enter your name" type="text" onChange={handleChange} />
          <FormInput name="email" label="Email" placeholder="Enter your email" type="text" onChange={handleChange} />
          <FormInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={handleChange}
          />
          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter your password"
            type="password"
            onChange={handleChange}
          />
          <button className="bg-bg-primary text-white font-bold text-lg py-2 mt-3 w-full">Sign Up</button>
        </form>
        <p className="pt-2 text-sm w-full">
          Have an account ?{" "}
          <span className="text-bg-primary hover:underline text-base hover:cursor-pointer">
            <Link to="/login">Log In</Link>
          </span>
        </p>
      </div>
      <img src={shop} className="hidden md:block md:w-80 lg:w-96  " />
    </div>
  );
};

export default Signup;
