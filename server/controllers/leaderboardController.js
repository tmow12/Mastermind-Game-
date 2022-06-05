const db = require("../models/leaderboardModel");
const { response } = require("../server");

const leaderboardController = {};

/**
 * This method will querey the database and return 10 users with the highest score
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
leaderboardController.getLeaders = (req, res, next) => {
    const text = 
    `
    SELECT * FROM users 
    ORDER BY SCORE ASC, username LIMIT 10;
    `
    db.query(text)
        .then(response => {
        console.log('this is from leaderboard', response.rows);
        res.locals.leaderboard = response.rows;
        return next();
        })
        .catch((err) => next(err));
};

/**
 * This method will accept a user profile and will store it in the database
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
leaderboardController.submitScore = (req, res, next) => {
    const { user, score, difficulty } = req.body;
    console.log('req.body', req.body)
    const values = [user, score, difficulty]
    console.log('values', values)
    const text= 
    `INSERT INTO users (username, score, difficulty)
    VALUES ($1, $2, $3);`

    db.query(text, values)
        .then(response => {
            return next();
        })
        .catch((err) => (err));
};

module.exports = leaderboardController;