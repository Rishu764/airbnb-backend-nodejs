const successResponse = (res, data, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    status: statusCode,
    message,
    data,
  });
};

const errorResponse = (res, error, message = "Error", statusCode = 500) => {
  return res.status(statusCode).json({
    status: statusCode,
    message,
    error: error && error.message ? error.message : error,
  });
};

export { successResponse, errorResponse };
