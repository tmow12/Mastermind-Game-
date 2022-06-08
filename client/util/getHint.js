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
            //check if number is invalid or number is in the wrong location 
            //use a cache to keep track of numbers seen
            //if the current number is in the targetNumCache then we need to signal the user 
            //that they guessed a correct number but in the wrong location 
            //decrement number out of targetNumCache 
            if (targetNumCache[userGuess[i]]) {
                targetNumCache[userGuess[i]]--;
                userHint+='X';
            } else {
                //other wise store number in guessCache
                guessCache[userGuess[i]] = 1;
            }

            //if the current number is in the guessCache then we need to signal the user 
            //that they guessed a correct number but in the wrong location 
            //decrement number out of guessCache 
            if (guessCache[targetNumber[i]]) {
                guessCache[targetNumber[i]]--;
                userHint+='X';
            } else {
                //otherwise store this number in the targetNumCache
                targetNumCache[targetNumber[i]] = 1;
            }
        }
    }
    return userHint; 
}

module.exports = getHint