import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const FormInput = ({ name, label, placeholder, type, onChange }) => {
  const [shouldPasswordVisible, setShouldPasswordVisible] = useState(false);
  return (
    <div className="flex flex-col py-2">
      <label className="py-1 w-full">{label}</label>
      <div className="relative flex">
        <input
          type={shouldPasswordVisible ? "text" : type}
          name={name}
          className="w-full border-[1px] p-2 focus:outline-none placeholder:text-xs"
          placeholder={placeholder}
          onChange={onChange}
        />
        {name === "password" && (
          <button className="absolute right-3 top-3" onClick={() => setShouldPasswordVisible(!shouldPasswordVisible)}>
            {shouldPasswordVisible ? <FaEye color="#BB1C6B" /> : <FaEyeSlash color="#BB1C6B" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;
