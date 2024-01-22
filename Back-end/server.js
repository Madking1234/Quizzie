const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const signUp = require("./routes/SignUp");
const logIn = require("./routes/Login");
const dashboard = require("./routes/dashboard");
const createQuiz = require("./routes/createQuiz");
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "welcome",
  });
});
app.use(signUp);
app.use(logIn);
app.use(dashboard);
app.use(createQuiz);
app.listen(process.env.PORT, () => {
  connectDB();
  console.log("server is running");
});
