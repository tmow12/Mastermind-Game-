import React, { useState } from 'react';
import StartGame from './StartGame.jsx';


function App() {
  const [start, setStart] = useState(false)

    function startGame() {
        setStart(!start);
    }

  if (start === true) {
      return (
        <div>
            <StartGame/>
        </div>
      )
  }

  return (
      <div>
    <h1>Welcome to Trevor's Mastermind Game!</h1>
    <p>How to Play:</p> 
    <p>- Guess the four digit number</p>
    <p>- Each integer in the number will be from 0-7 inclusive</p>
    <p>- You will get feedback after every attempt</p>
    <p>- An X Represents a number you guessed was correct but in the wrong location</p>
    <p>- An O Represents a number you guessed was correct and in the right location</p>
    <p>- You will have 10 attempts to guess the number</p>
    <button onClick={startGame}>Start!</button>
    </div>
  )
}

export default App