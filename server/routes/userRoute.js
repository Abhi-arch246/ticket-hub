const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// register user
router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.data.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User with this mail already exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.data.password, salt);

      req.body.data.password = hashedPassword;
      const user = new User(req.body.data);
      await user.save();

      return res.send({
        success: true,
        message: "Successfully registered",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: "Went wrong in trycatch",
    });
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.data.email });
    if (!userExists) {
      return res.send({
        success: false,
        message: "User with this mail doesn't exists",
      });
    } else {
      const checkPassword = await bcrypt.compare(
        req.body.data.password,
        userExists.password
      );

      if (checkPassword) {
        const token = jwt.sign(
          { userId: userExists._id },
          process.env.SECRET_KEY,
          { expiresIn: "3d" }
        );

        return res.send({
          success: true,
          message: "Successful Login",
          data: token,
        });
      } else {
        return res.send({
          success: false,
          message: "Invalid Password",
        });
      }
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
