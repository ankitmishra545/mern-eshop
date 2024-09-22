import { FaRegUserCircle } from "react-icons/fa";
import shop from "../assets/3794707.jpg";
import { useRef, useState } from "react";
import { validateEmailPasswordInput, validateNameInput } from "../utils/validate";
import { useNavigate, Link } from "react-router-dom";
import imageTobase64 from "../utils/imageToBase64";
import FormInput from "../components/FormInput";

//creates account for users, password  contains number, letter and symbol
const Signup = () => {
  const navigate = useNavigate();
  const filePickerRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setErrorMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submitting the sign up form and navigating to login page
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password, confirmPassword } = formData;
    if (confirmPassword !== password) return setErrorMessage("Password is not Matching!");
    const message = validateEmailPasswordInput({ email, password });
    const nameValidationMessage = validateNameInput(name);
    if (message || nameValidationMessage) {
      setErrorMessage("Please fill all details!");
      return;
    }
    const jsonResponse = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const jsoData = await jsonResponse.json();
    setLoading(false);
    if (jsoData.success === false) {
      setErrorMessage(jsoData.message);
      return;
    }
    navigate("/login");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const profileImage = await imageTobase64(file);

    setFormData({ ...formData, profileImage });
  };

  return (
    <div className="w-full pt-3 flex justify-center md:p-10">
      <div className="w-full p-3 flex flex-col items-center md:w-80 lg:w-96 bg-white">
        <form onSubmit={handleClick} className="w-full px-2">
          <div className="flex justify-center">
            {formData.profileImage && (
              <img
                src={formData.profileImage}
                className="w-20 rounded-full"
                onClick={() => filePickerRef.current.click()}
              />
            )}
            {!formData.profileImage && (
              <FaRegUserCircle
                onClick={() => filePickerRef.current.click()}
                className="relative"
                size="60px"
                color="#BB1C6B"
              />
            )}

            <input type="file" onChange={handleImageChange} className="  hidden" ref={filePickerRef} />
          </div>

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
          <button className="bg-bg-primary text-white font-bold text-lg py-2 mt-3 w-full">
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <p className="pt-2 text-sm w-full">
          Have an account ?{" "}
          <span className="text-bg-primary hover:underline text-base hover:cursor-pointer">
            <Link to="/login">Log In</Link>
          </span>
        </p>
        <p className="h-2 text-red-600 py-2 text-sm font-serif">{errorMessage}</p>
      </div>
    </div>
  );
};

export default Signup;
