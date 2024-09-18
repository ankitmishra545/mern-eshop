export const test = (req, res) => {
  res.json({ message: "Api is working" });
};

export const logout = (req, res, next) => {
  console.log("logout");
  try {
    res.clearCookie("access_token").status(200).json("User has been successfully sign out!");
  } catch (error) {
    next(error);
  }
};
