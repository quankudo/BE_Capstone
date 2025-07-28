module.exports.successResponse = (data, message) => {
  const response = {
    status: "success",
    data
  };
  if (message) response.message = message;
  return response;
};

module.exports.errorResponse = (message = "Something went wrong", code = 500) => {
  return {
    status: "error",
    code,
    message
  };
};
