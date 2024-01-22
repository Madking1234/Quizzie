const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/authMiddleware");
const Quiz = require("../models/Quiz");

router.get("/quizAnalysis/:quizId", isLoggedIn, async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.json({
        status: "Failed",
        message: "Quiz not found",
      });
    }

    let totalAttempts = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    quiz.responses.forEach((response) => {
      totalAttempts += 1;
      response.answers.forEach((answer) => {
        if (answer.isCorrect) {
          correctAnswers += 1;
        } else {
          incorrectAnswers += 1;
        }
      });
    });

    res.json({
      status: "Success",
      totalAttempts,
      correctAnswers,
      incorrectAnswers,
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

router.get("/quiz/:quizId", async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.json({
        status: "Failed",
        message: "Quiz not found",
      });
    }
    quiz.impressions += 1;
    await quiz.save();

    res.json({
      status: "Success",
      message: "Quiz retrieved successfully",
      quiz,
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

router.post("/createQuiz", isLoggedIn, async (req, res) => {
  try {
    console.log(req.user);
    const { title, type, questions, timer } = req.body;
    const userId = req.user._id;
    const newQuiz = await Quiz.create({
      title,
      type,
      questions,
      timer,
      createdBy: userId,
      impressions: 0,
    });

    const quizLink = `${req.protocol}://${req.get("host")}/quiz/${newQuiz._id}`;

    res.json({
      status: "Success",
      message: "Quiz created successfully",
      quizId: newQuiz._id,
      quizLink,
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
