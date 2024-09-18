export const validateEmailPasswordInput = ({ email, password }) => {
  if (!email || !password) return "Please fill all details!";

  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  if (!isValidEmail) return "Email is not acceptable";

  const isValidPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
  if (!isValidPassword) return "Password is not acceptable";

  return null;
};

export const validateNameInput = (name) => {
  if (!name) return "Please fill all details";
  const isValidName = /^[a-zA-Z ]{2,30}$/.test(name);
  if (!isValidName) return "Name is not acceptable";
};
