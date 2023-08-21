exports.myLogger = (req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
};

exports.reqTimeLog = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};
