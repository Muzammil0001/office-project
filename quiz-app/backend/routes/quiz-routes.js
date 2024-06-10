const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz-controller");

// Routes for quizzes
router.post("/quizzes", quizController.createQuiz);
router.get("/quizzes", quizController.getAllQuizzes);
router.get("/quizzes/:id", quizController.getQuizById);
router.patch("/quizzes/:id", quizController.updateQuiz);
router.delete("/quizzes/:id", quizController.deleteQuiz);
router.get("/student/quizzes/:userId", quizController.getQuizzesByUserId);

module.exports = router;
