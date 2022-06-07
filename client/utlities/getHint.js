/**
 * This function will accept a user's guess and return a hint
 * @param {string} userGuess 
 * @returns {string} 
 */
 export default function getHint(userGuess) {
    let userHint = '';
    const guessCache = {};
    const targetNumCache = {};

    for (let i = 0; i < userGuess.length; i++) {
        if (userGuess[i] === targetNumber[i]) {
            userHint+='O';
            continue;
        } else {
            if (targetNumCache[userGuess[i]]) {
                targetNumCache[userGuess[i]]--;
                userHint+='X';
            } else {
                guessCache[userGuess[i]] = 1;
            }
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