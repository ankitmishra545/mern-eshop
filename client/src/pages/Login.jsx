import shop from "../assets/3794707.jpg";
import { FaRegUserCircle } from "react-icons/fa";
import FormInput from "../helper/FormInput";

const Login = () => {
  return (
    <div className="flex p-10 border-2 ">
      <div className="w-80 p-1 flex flex-col items-center">
        <FaRegUserCircle size="40px" color="#BB1C6B" />
        <div>
          <FormInput label="Email" placeholder="Enter your email" type="text" />
          <FormInput label="Password" placeholder="Enter your password" type="password" />
          <button className="bg-bg-primary text-white font-bold text-lg py-3 mt-3 w-full">Login</button>
        </div>
        <p className="pt-2 text-sm">
          Don't have account ?{" "}
          <span className="text-bg-primary hover:underline text-base hover:cursor-pointer">Sign up</span>
        </p>
      </div>
      <img src={shop} className="w-80" />
    </div>
  );
};

export default Login;
