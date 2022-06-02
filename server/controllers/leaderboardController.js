const db = require("../models/leaderboardModel");

const leaderboardController = {};

leaderboardController.getLeaders = (req, res, next) => {
    const text = 
    `SELECT * FROM users 
    ORDER BY SCORE ASC LIMIT 10;`
    
    db.query(text)
        .then(response => {
        console.log('this is from leaderboard', response.rows);
        res.locals.leaderboard = response.rows;
        return next();
        })
        .catch((err) => next(err));
};

leaderboardController.submitScore = (req, res, next) => {
    const { user, score } = req.body;
    const values = [user, score]
    const text= `
    INSERT INTO users (username, score)
    VALUES ($1, $2);
    `
    db.query(text, values)
        .then(response => {
            console.log('Score Added to Leaderboard');
            return next();
        })
        .catch((err) => next(err));


    //need to add functionality here to add to add scores to database 
}


module.exports = leaderboardController;