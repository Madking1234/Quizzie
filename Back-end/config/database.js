const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("connection successfull"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
