const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      let hasPasswordMatched = await bcrypt.compare(password, user.password);
      if (hasPasswordMatched) {
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        res.json({
          status: "Success",
          message: "loggedin",
          token,
        });
      } else {
        res.json({
          status: "Failed",
          message: "try again",
        });
      }
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: "user does not exist",
    });
  }
});
module.exports = router;
