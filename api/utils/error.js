//created custom error handler that returns error to the next route handler, recieves the status code and message from the route handler
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
