const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/authMiddleware");

router.get("/dashboard", isLoggedIn, async (req, res) => {
  console.log(req.user);
  const user = req.user;
  res.json({
    message: "hurray",
  });
});

module.exports = router;
