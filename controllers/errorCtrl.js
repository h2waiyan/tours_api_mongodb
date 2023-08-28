module.exports = (err, req, res, next) => {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.stauts = err.stauts || "error";

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
