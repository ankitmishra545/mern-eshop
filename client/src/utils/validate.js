const validateFormInput = ({ name, email, password }) => {
  if (!name || !email || !password) return "Please fill all details!";

  const isValidName = /^[a-zA-Z ]{2,30}$/.test(name);
  if (!isValidName) return "Name is not acceptable";

  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  if (!isValidEmail) return "Email is not acceptable";

  const isValidPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
  if (!isValidPassword) return "Password is not acceptable";

  return null;
};

export default validateFormInput;
