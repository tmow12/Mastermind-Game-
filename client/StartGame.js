import React, { useState, useEffect } from 'react';
import SubmitScore from './SubmitScore.js';

function StartGame({ difficulty }) {
    
    const [targetNumber, setTargetNumber] = useState();
    const [guess, setGuess] = useState();
    const [history, setHistory] = useState([]);
    const [winner, setWinner] = useState(false);
    const [score, setScore] = useState(0);

  //target number is 4443
  // 1234 -> XX
  // 4444 -> OOO
  // 5555 ->
  // 1344 -> XOX
  /**This object contains the settings that the user can select
   * @type {Object}
   */
    const settings = {
        'Easy': {
            'digits': 4,
            'maxInt': 4,
            'guesses': 10,
            'max': 4444,
        },
        'Medium': {
            'digits': 4,
            'maxInt': 5,
            'guesses': 9,
            'max':5555,
        },
        'Hard': {
            'digits': 5,
            'maxInt': 6,
            'guesses': 8,
            'max':66666
        },
    };

    const digitLength = settings[difficulty].digits;
    const maxIntLength = settings[difficulty].maxInt;
    const startingGuesses = settings[difficulty].guesses;
  
        useEffect(() => {
            fetch(`https://www.random.org/integers/?num=${digitLength}&min=0&max=${maxIntLength}&col=4&base=10&format=plain&rnd=new`)
            .then(response => response.text())
            .then(data => data.replace(/\s/g, ''))                
            .then(data => setTargetNumber(data))
        }, [])
  
   
    console.log('targetnumber', targetNumber)

/**
 * This function will accept a user's guess and return a hint
 * @param {string} userGuess 
 * @returns {string} 
 */
    function getHint(userGuess) {
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

    /**
     * This function accepts an event and will submit a user guess and checks for a winning guess
     * @param {Object} e 
     */
    function submitGuess(e) {
        e.preventDefault();

        const hint = getHint(guess);

        const currGuess = {
          originalInput: guess,
          hint: hint,    
        };

        if (hint === 'OOOO') {
            currGuess.hint = 'You are correct!'
            setWinner(!winner)
        }

        if (hint === '') {
            currGuess.hint = 'Nice try. Guess a different number!'
        }

        setHistory([...history, currGuess]);
        setScore(history.length+1);
    }

  return (
    <div>
      <div className='instructions-container'>
      <h3>Instructions:</h3>
      {difficulty === 'Easy' && <div>The secret number is 4 digits long. Each integer in the number will be from 0-4 inclusive. </div>}
      {difficulty === 'Medium' && <div>The secret number is 4 digits long. Each integer in the number will be from 0-5 inclusive. </div>}
      {difficulty === 'Hard' && <div>The secret number is 5 digits long. Each integer in the number will be from 0-6 inclusive. </div>}

      
      <div>You will get a hint after every guess</div>
      <div>An X represents a number you guessed was correct but in the wrong location</div>
      <div>An O represents a number you guessed was correct and in the right location</div>
      <div>Note: The position of the X and O's are not correlated to the position of the in your guess or the secret number</div>
      </div>
      <div className='gameboard-container'>
      <div className='form-container'>
      <form onSubmit={(e)=> {submitGuess(e)}}>
      <input 
        placeholder='Number' onChange={(e)=>setGuess(e.target.value)} 
        max={settings[difficulty].max.toString()} min='0'
        disabled={history.length === startingGuesses || winner === true}
        type='number'>
        </input> 
      <button disabled={history.length === startingGuesses || winner === true}>Submit</button>
      </form>
      <div>Guesses Remaining: {startingGuesses-history.length}</div>
      </div>
      <div className='history-container'>
      <ul>History
        {history.map(({ originalInput, hint }, index) => (
          <li key={index}>Guessed: {originalInput} Hint: {hint} </li>
        ))}
      </ul>
      </div>
      </div>
      {winner && <div>
          You gussed the correct number!!! Your score is {score}
          <SubmitScore score={score} difficulty={difficulty}/>
          </div>}
      {history.length === startingGuesses && winner === false && <div>
          You dummy you lost! The Secret number was {targetNumber}
          </div>}
      
    </div>
  )
}

export default StartGame