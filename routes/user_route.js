const authController = require("../controllers/authController");
const express = require("express");

const userRouter = express.Router();

userRouter.post("/signup", authController.signup);
userRouter.post("/signin", authController.signin);

module.exports = userRouter;
