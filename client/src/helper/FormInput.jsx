const FormInput = ({ label, placeholder, type }) => {
  return (
    <div className="flex flex-col py-2">
      <label className="py-1 w-full">{label}</label>
      <input
        type={type}
        className="w-full border-[1px] p-2 focus:outline-none placeholder:text-xs"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
