import React, { useState } from 'react';
import StartGame from './StartGame.jsx';
import './styles.scss';
import brain from './assets/brain.png'


function App() {

  const [start, setStart] = useState(false)
  const [difficulty, setDifficulty] = useState()

    /**
     * This function starts the game 
     */
    function startGame() {
        setStart(!start);
    }

  if (start === true) {
      return (
        <div>
            <StartGame difficulty={difficulty} startGame={startGame} data-testid='start-game-component'/>
        </div>
      )
  }

  return (
    <div>
    <div className='welcome-container'>
    <img src={brain} className='brain-logo'></img>
    <h1 className='title'>Mastermind</h1>
    <h4>Select Difficulty</h4>
    <div className='difficulty-container'>
    <button 
    onClick={()=> setDifficulty('Easy')} 
    className='easy-button' 
    data-testid='easy-button-1'>
      Easy
      </button>
    <button 
    onClick={()=> setDifficulty('Medium')} 
    className='medium-button'
    data-testid='medium-button-1'>
      Medium
      </button>
    <button 
    onClick={()=> setDifficulty('Hard')} 
    className='hard-button'
    data-testid='hard-button-1'>
      Hard
      </button>
    </div>
    <div className='start-container'>
        {difficulty && 
        <div className='start-container'>
          <div className='difficulty-selected'>
            You Selected {difficulty}! Good luck! Press Start to Continue...
            </div>
          <button 
          onClick={startGame} 
          className='start-button'
          data-testid='start-button-1'>
            Start!
            </button>
          </div>
        }
    </div>
    </div>
    </div>
  )
}

export default App;