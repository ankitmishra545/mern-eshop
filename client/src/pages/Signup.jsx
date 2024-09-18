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
    const { name, email, password } = formData;
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
    <div className="flex p-10 border-2 ">
      <div className="w-80 p-1 flex flex-col items-center">
        <FaRegUserCircle size="40px" color="#BB1C6B" />
        <p className="h-2 text-red-600 py-2 text-sm font-serif">{errorMessage}</p>
        <form onSubmit={handleClick}>
          <FormInput name="name" label="Email" placeholder="Enter your name" type="text" onChange={handleChange} />
          <FormInput name="email" label="Email" placeholder="Enter your email" type="text" onChange={handleChange} />
          <FormInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={handleChange}
          />
          <button className="bg-bg-primary text-white font-bold text-lg py-3 mt-3 w-full">Sign Up</button>
        </form>
        <p className="pt-2 text-sm">
          "Have an account ?
          <span className="text-bg-primary hover:underline text-base hover:cursor-pointer">
            <Link to="/signin">Sign In</Link>
          </span>
        </p>
      </div>
      <img src={shop} className="w-80" />
    </div>
  );
};

export default Signup;
