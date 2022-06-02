const express = require('express');
const router = express.Router();
const path = require('path');

const leaderboardController = require('../controllers/leaderboardController');

router.get('/leaderboardScore', leaderboardController.getLeaders, (req, res) => {
    return res.status(200).json(res.locals.leaderboard);
});

router.post('/leaderboard', leaderboardController.submitScore, (req, res) => {
    return res.status(200).send(console.log('score added to leaderboard'));
})


module.exports = router;