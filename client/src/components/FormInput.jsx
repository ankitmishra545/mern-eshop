import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

// reusable form input component
const FormInput = ({ name, label, placeholder, type, onChange, value = "" }) => {
  // following state variable is used to handle the password visibility
  const [shouldPasswordVisible, setShouldPasswordVisible] = useState(false);
  return (
    <div className="flex flex-col py-2">
      <label className="py-1 w-full">{label}</label>
      <div className="relative flex">
        <input
          type={shouldPasswordVisible ? "text" : type}
          name={name}
          defaultValue={value}
          className="w-full border-[1px] p-2 focus:outline-none placeholder:text-xs"
          placeholder={placeholder}
          onChange={onChange}
        />
        {type === "password" && (
          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => {
              //changing the state
              setShouldPasswordVisible(!shouldPasswordVisible);
            }}
          >
            {shouldPasswordVisible ? <FaEye color="#BB1C6B" /> : <FaEyeSlash color="#BB1C6B" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
