module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      err: err,
      message: err.message,
      errorStack: err.stack,
    });
  };

  const sendErrorProd = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  };

  err.statusCode = err.statusCode || 500;
  err.status = err.stauts || "error";

  if (process.env.NODE_ENVIRONMENT == "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENVIRONMENT == "production") {
    sendErrorProd(err, res);
  }
};
