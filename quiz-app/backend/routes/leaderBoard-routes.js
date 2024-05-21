const express = require('express');
const router = express.Router();
const leaderBoardController = require('../controllers/leaderboard-controller');

router.get('/leaderboard', leaderBoardController.getAllLeaderBoards);

router.get('/leaderboard/:id', leaderBoardController.getLeaderBoardById);

router.post('/leaderboard', leaderBoardController.createLeaderBoard);

router.patch('/leaderboard/:id', leaderBoardController.updateLeaderBoardById);

router.delete('/leaderboard/:id', leaderBoardController.deleteLeaderBoardById);

module.exports = router;
