const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("Token not provided");
    }

    const user = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.json({ status: "FAILED", message: "Login First" });
  }
};

module.exports = isLoggedIn;
