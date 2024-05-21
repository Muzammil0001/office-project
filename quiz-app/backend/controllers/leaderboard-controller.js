const LeaderBoard = require('../models/leaderBoard-model');
const Quiz = require('../models/quizzes-model');
const User = require('../models/user-model');


//Create LeaderBoards<=====================>
exports.createLeaderBoard = async (req, res) => {
    const { quizId, topScores } = req.body;

    try {

        const quizExists = await Quiz.findById(quizId);
        if (!quizExists) {
            console.log( { message: `Quiz reference not found: ID ${quizId}`} );
            return res.status(404).send({ message: 'Quiz not found' });
        }


        for (const topScoreEntry of topScores) {
            const studentExists = await User.findById(topScoreEntry.studentId);
            if (!studentExists) {
                    console.log( { message: `Student not found: ID ${topScoreEntry.studentId}`} );
                return res.status(404).send({ message: `Student not found: ID ${topScoreEntry.studentId}` });

            }
        }


        const leaderBoard = new LeaderBoard({ quizId, topScores });
        await leaderBoard.save();
        res.status(201).send({ message: 'LeaderBoard created successfully', leaderBoard });
    } catch (error) {
        res.status(500).send({ message: 'Failed to create leaderBoard', error: error.message });
    }
};



// GET all leaderBoards<=====================>
exports.getAllLeaderBoards = async (req, res) => {
    try {
        const leaderBoards = await LeaderBoard.find().populate('quizId').populate('topScores.studentId');
        res.status(200).send(leaderBoards);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve leaderBoards', error: error.message });
    }
};

// Get a single leaderBoard by IDs<=====================>
exports.getLeaderBoardById = async (req, res) => {
    const { id } = req.params;
    try {
        const leaderBoard = await LeaderBoard.findById(id).populate('quizId').populate('topScores.studentId');
        if (!leaderBoard) {
            return res.status(404).send({ message: 'LeaderBoard not found' });
        }
        res.status(200).send(leaderBoard);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve leaderBoard', error: error.message });
    }
};
//update leaderBoards<=====================>
exports.updateLeaderBoardById = async (req, res) => {
    const { id } = req.params;
    const { topScores } = req.body;
    try {
        if (topScores) {
            for (let scoreEntry of topScores) {
                if (scoreEntry.score < 0 || scoreEntry.score > 100) {
                    return res.status(400).send({ message: `Invalid score: ${scoreEntry.score}. Score must be between 0 and 100.` });
                }
            }
        }

        const leaderBoard = await LeaderBoard.findByIdAndUpdate(id, req.body,{ new: true });
        if (!leaderBoard) {
            return res.status(404).send({ message: 'LeaderBoard not found' });
        }
        res.status(200).send({ message: "LeaderBoard Updated successfully. ", leaderBoard });
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve leaderBoard', error: error.message });
    }
};
//delete leaderBoards<=====================>
exports.deleteLeaderBoardById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await LeaderBoard.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: 'LeaderBoard not found' });
        }
        res.status(200).send({ message: 'LeaderBoard successfully deleted', result });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete leaderBoard', error: error.message });
    }
};