/**
     * This function accepts an event and will submit a user guess and checks for a winning guess
     * @param {Object} e 
     */
 export function submitGuess(e) {
    e.preventDefault();
    const guess = createGuess();
    const hint = getHint(guess);

    console.log('guess', guess)

    const currGuess = {
        originalInput: guess,
        hint: hint,    
    };

    if (hint === 'OOOO' || hint === 'OOOOO') {
        return 'You are correct!';
        setWinner(!winner);
    }
    if (hint === '') {
        return 'Nice try. Guess a different number!';
    }
    setHistory([...history, currGuess]);
    setScore(history.length+1);
}


