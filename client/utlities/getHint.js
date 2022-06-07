/**
 * This function will accept a user's guess the target number and return a hint
 * @param {string} userGuess 
 * @param {string} targetNumber
 * @returns {string} 
 */
 function getHint(userGuess, targetNumber) {
    let userHint = '';
    const guessCache = {};
    const targetNumCache = {};

    //check for same number in the same location
    for (let i = 0; i < userGuess.length; i++) {
        if (userGuess[i] === targetNumber[i]) {
            userHint+='O';
            continue;
        } else {
            //else the number left to check are going to be invalid, 
            //or they are going to be numbers that are correct, but in the wrong location.
            //need to keep track of numbers seen so far in the target number
            if (targetNumCache[userGuess[i]]) {
                targetNumCache[userGuess[i]]--;
                userHint+='X';
            } else {
                guessCache[userGuess[i]] = 1;
            }
            
            //keep track of numbers seen in the users guess
            if (guessCache[targetNumber[i]]) {
                guessCache[targetNumber[i]]--;
                userHint+='X';
            } else {
                targetNumCache[targetNumber[i]] = 1;
            }
        }
    }
    return userHint; 
}

module.exports = getHint