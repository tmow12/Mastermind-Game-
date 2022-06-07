import React, { useState, useEffect } from 'react';
import SubmitScore from './SubmitScore.jsx';



function StartGame({ difficulty, startGame }) {
   
    const [targetNumber, setTargetNumber] = useState();
    const [history, setHistory] = useState([]);
    const [winner, setWinner] = useState(false);
    const [score, setScore] = useState(0);
    const [input1, setInput1] = useState(0);
    const [input2, setInput2] = useState(0);
    const [input3, setInput3] = useState(0);
    const [input4, setInput4] = useState(0);
    const [input5, setInput5] = useState(0);

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
        },
        'Medium': {
            'digits': 4,
            'maxInt': 5,
            'guesses': 9,
        },
        'Hard': {
            'digits': 5,
            'maxInt': 6,
            'guesses': 8,
        },
    };

    const digitLength = settings[difficulty].digits;
    const maxIntLength = settings[difficulty].maxInt;
    const startingGuesses = settings[difficulty].guesses;

    /**
     * This useEffect hook will generate a random number for the user to guess
     */
    useEffect(() => {
        fetch(`https://www.random.org/integers/?num=${digitLength}&min=0&max=${maxIntLength}&col=4&base=10&format=plain&rnd=new`)            
        .then(response => response.text())
        .then(data => data.replace(/\s/g, ''))                
        .then(data => setTargetNumber(data))
    }, [])
  
    console.log('targetnumber', targetNumber)

/**
 * This function will return the users guess
 * @returns {integer}
 */
    function createGuess() {
        if (difficulty !== 'Hard') {
            let guess = [input1, input2, input3, input4,].join('');
            return guess;
        } else {
            let guess = [input1, input2, input3, input4, input5].join('');
            return guess; 
        }
    }

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
        const guess = createGuess();
        const hint = getHint(guess);

        const currGuess = {
            originalInput: guess,
            hint: hint,    
        };
    
        if (hint === 'OOOO' || hint === 'OOOOO') {
            currGuess.hint = 'You are correct!';
            setWinner(!winner);
        }
        if (hint === '') {
            currGuess.hint = 'Nice try. Guess a different number!';
        }
        setHistory([...history, currGuess]);
        setScore(history.length+1);
    }

  return (
    <div>
      <div className='game-container'>   
      <div className='instructions-container'>
      <h3>Instructions:</h3>
      <div>Guess the secret number</div>
      {difficulty === 'Easy' && <div>The secret number is 4 digits long. Each integer in the secret number will be from 0-4 inclusive. </div>}
      {difficulty === 'Medium' && <div>The secret number is 4 digits long. Each integer in the secret number will be from 0-5 inclusive. </div>}
      {difficulty === 'Hard' && <div>The secret number is 5 digits long. Each integer in the secret number will be from 0-6 inclusive. </div>}
      <div>You will get a hint after every guess.</div>
      <div>An X represents a number you guessed was correct but in the wrong location.</div>
      <div>An O represents a number you guessed was correct and in the right location.</div>
      <div>Note: The position of the X and O's are not correlated to the position of the in your guess or the secret number.</div>
      </div>
      <div className='gameboard-container'>
      <div className='form-container'>
      <form onSubmit={(e)=> {submitGuess(e)}}>
      <input 
        className='input1'
        placeholder='0' onChange={(e)=>setInput1(e.target.value)} 
        max={settings[difficulty].maxInt.toString()} 
        disabled={history.length === startingGuesses || winner === true}
        type='number'
        min='0'
        maxLength={1}>
        </input> 
        <input 
        className='input2'
        placeholder='0' onChange={(e)=>setInput2(e.target.value)} 
        max={settings[difficulty].maxInt.toString()} 
        disabled={history.length === startingGuesses || winner === true}
        type='number'
        min='0'
        maxLength={1}>
        </input> 
        <input 
        className='input3'
        placeholder='0' onChange={(e)=>setInput3(e.target.value)} 
        max={settings[difficulty].maxInt.toString()} 
        disabled={history.length === startingGuesses || winner === true}
        type='number'
        min='0'
        maxLength={1}>
        </input> 
        <input 
        className='input4'
        placeholder='0' onChange={(e)=>setInput4(e.target.value)} 
        max={settings[difficulty].maxInt.toString()} 
        disabled={history.length === startingGuesses || winner === true}
        type='number'
        min='0'
        maxLength={1}>
        </input> 
        {difficulty === 'Hard' && <input 
        className='input5'
        placeholder='0' onChange={(e)=>setInput5(e.target.value)} 
        max={settings[difficulty].maxInt.toString()} 
        disabled={history.length === startingGuesses || winner === true}
        type='number'
        min='0'
        maxLength={1}>
        </input>}
      <button 
      className='submit-guess-button' 
      disabled={history.length === startingGuesses || winner === true}
      data-testid='submit-guess-button-1'>
          Submit
          </button>
      </form>
      <div>Guesses Remaining: {startingGuesses-history.length}</div>
      </div>
      <div className='history-container'>
      <ul>History
        {history.map(({ originalInput, hint }, index) => (
          <li key={index}>You guessed: {originalInput} Hint: {hint}</li>
        ))}
      </ul>
      
      </div>
      </div>
      {winner && <div>
          You gussed the correct number!!! Your score is {score}
          <SubmitScore score={score} difficulty={difficulty} startGame={startGame}/>
          </div>}
      {history.length === startingGuesses && winner === false && <div>
      <div>You dummy you lost! The Secret number was {targetNumber}</div>
      <button onClick={startGame}>Restart Game</button>
      </div>
      }
    </div>
    </div>
  )
}

export default StartGame