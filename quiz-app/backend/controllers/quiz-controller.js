const Quiz = require('../models/quizzes-model');



// Create a new quiz=====================
exports.createQuiz = async (req, res) => {
    try {
      const { createdBy } = req.body;
      const userExists = await User.findById(createdBy);

      if (!userExists) {
          return res.status(404).send({ message: 'User not found. Invalid createdBy ID.' });
      }
        const newQuiz = new Quiz(req.body);
        await newQuiz.save();
        res.status(201).send({ message: 'Quiz created successfully', quiz: newQuiz });
    } catch (error) {
        res.status(400).send({ message: 'Failed to create quiz', error: error.message });
    }
};

// Get all quizzes<=====================>
exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({});
        res.status(200).send(quizzes);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve quizzes', error: error.message });
    }
};

// Get a single quiz by ID=====================
exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).send({ message: 'Quiz not found' });
        }
        res.status(200).send(quiz);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve quiz', error: error.message });
    }
};

// Update a quiz by ID=====================
exports.updateQuiz = async (req, res) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuiz) {
            return res.status(404).send({ message: 'Quiz not found' });
        }
        res.status(200).send({ message: 'Quiz updated successfully', quiz: updatedQuiz });
    } catch (error) {
        res.status(400).send({ message: 'Failed to update quiz', error: error.message });
    }
};

// Delete a quiz by ID=====================
exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) {
            return res.status(404).send({ message: 'Quiz not found' });
        }
        res.status(200).send({message: 'Quiz deleted successfully', quiz:quiz});
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete quiz', error: error.message });
    }
};
