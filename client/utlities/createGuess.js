/**
 * This function will return the users guess
 * @returns {integer}
 */
 export default function createGuess() {
    if (difficulty !== 'Hard') {
        let guess = [input1, input2, input3, input4,].join('');
        return guess;
    } else {
        let guess = [input1, input2, input3, input4, input5].join('');
        return guess; 
    }
}