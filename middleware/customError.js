
const CustomError = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || "error";
    res.status(statusCode).json({ status, message: error.message });
  };
  
export default CustomError;  