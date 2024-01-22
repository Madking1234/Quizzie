const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
router.post("/SignUp", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
      userName,
      email,
      password: encryptedPassword,
    });
    res.json({
      status: "ADDED",
      message: "User added successfully",
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message: "Something went wrong",
    });
  }
});
module.exports = router;
