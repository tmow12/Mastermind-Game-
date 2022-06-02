import React, { useState, useEffect } from 'react'
import Leaderboard from './Leaderboard.jsx';
import SubmitScore from './SubmitScore.jsx';

function StartGame() {
    
    //targetnumber type is string
    const [targetNumber, setTargetNumber] = useState();
    const [guess, setGuess] = useState();
    const [history, setHistory] = useState([])
    const [winner, setWinner] = useState(false);
    const [score, setScore] = useState(0);

  //target number is 4443
  // 1234 -> XX
  // 4444 -> OOO
  // 5555 ->
  // 1344 -> XOX
  

  // history = [{origInput: 1234, hint: "XX"}, {origInput: 4444, hint: "OOO"}]
  // let guessesRemaining = 8 - history.length;
  
    const getNumber = useEffect(() => {
        fetch("https://www.random.org/integers/?num=4&min=0&max=4&col=4&base=10&format=plain&rnd=new")
        .then(response => response.text())
        .then(data => data.replace(/\s/g, ''))
        .then(data => setTargetNumber(data))
    }, [])

    console.log(guess)
    console.log(targetNumber)
    console.log(history)

    function getHint(userGuess) {
        let result = '';
        const guessCache = {};
        const targetNumCache = {};

        for (let i = 0; i < userGuess.length; i++) {
            if (userGuess[i] === targetNumber[i]) {
                result+='O';
                continue;
            } else {
                if (targetNumCache[userGuess[i]]) {
                    targetNumCache[userGuess[i]]--;
                    result+='X';
                } else {
                    guessCache[userGuess[i]] = 1;
                }
                
                if (guessCache[targetNumber[i]]) {
                    guessCache[targetNumber[i]]--;
                    result+='X';
                } else {
                    targetNumCache[targetNumber[i]] = 1;
                }
            }
        }
        return result; 
    }

    function submitGuess() {
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
            currGuess.hint = 'Nice Try. Guess Again!'
        }

        setHistory([...history, currGuess]);
        setScore(history.length+1);
        console.log('currGuess', currGuess);
    }

  return (
    <div>
      <Leaderboard />
      <div>Guess the Four Digit Number</div>
      <label>Guess Number</label>
      <input placeholder='number' onChange={(e)=>setGuess(e.target.value)} type='number'></input> 
      <button onClick={submitGuess} disabled={history.length === 10 || winner === true}>Submit</button>
      <div>Guesses Remaining: {Math.abs(history.length-10)}</div>
      {winner && <div>
          You Won!!! Your Score is {score}
          <SubmitScore score={score}/>
          </div>}
      {history.length === 10 && winner === false && <div>
          You dummy you lost! The Secret Number was {targetNumber}
          <SubmitScore score={score}/>
          </div>}
      <ul>History
        {history.map(({ originalInput, hint }, index) => (
          <li key={index}>Guess: {originalInput} Hint: {hint} </li>
        ))}
      </ul> 
    </div>
  )
}

export default StartGame