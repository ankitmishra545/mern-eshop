import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// recieving the token from from the request and verify whether the request made by admin or not, if request made by admin then the user is added to request and passed to next route handler
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized access!"));

  // verifying the tokens recieved from the request
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unathorized access!"));
    }
    // adding the user into request, if no error
    req.user = user;
    next();
  });
};
