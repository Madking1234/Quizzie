const mongoose = require("mongoose");
const User = require("./User");
const responseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId },
      selectedOption: { type: String },
      isCorrect: { type: Boolean },
    },
  ],
});
const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String }],
  imageOptions: [{ type: String }],
  textImageOptions: [[{ type: String }]],
  correctOption: { type: String },
  timer: { type: String },
  impressions: { type: Number, default: 0 },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["poll", "q&a"], required: true },
  questions: [questionSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  impressions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  responses: [responseSchema],
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
