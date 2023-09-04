const User = require("../models/userModel");
const catchAsync = require("../api_features/catchAsync");
const AppError = require("../api_features/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
      name: newUser.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  console.log(user);

  if (!user) {
    return next(new AppError("User not registered", 404));
  }

  const checkPass = await bcrypt.compare(req.body.password, user.password);

  if (checkPass == false) {
    return next(new AppError("Wrong Password", 400));
  }

  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});
