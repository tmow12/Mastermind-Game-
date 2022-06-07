import React, { useState, useEffect } from 'react'

function SubmitScore({ score, difficulty, startGame }) {

    const [user, setUser] = useState('');
    const [leader, setLeaders] = useState([]);
    const [pokemon, setPokemon] = useState();
    const [disable, setDisable] = useState(false);

/**
 * This useEffect hook will fetch the leaderboard information on component mount
 */
    useEffect(() => {
      fetch('http://localhost:3000/getLeaderboardScore')
      .then(res => res.json())
      .then(data => {
          console.log('data from database', data);
          setLeaders(data);})
    }, [])

    /**
     * This function accepts a an event. It creates a user profle, and submits it to the leaderboard
     * @param {Object} e 
     */
   function submitToLeaderboard(e) {
       e.preventDefault();

       const userScore = {
           user: user,
           score: score,
           difficulty: difficulty
       };
       
       fetch('http://localhost:3000/submitToLeaderboard', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(userScore),
       })
        .then(res => res.json())
        .then(response => setLeaders(response))
        .then(next => setDisable(true));
    }

    /**
     * Easter Egg function to retrieve random pokemon :D
     */
    function getPokemon() {
        const num = Math.floor(Math.random() * (151 - 1 + 1) + 1)
        fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
        .then(res => res.json())
        .then(data => setPokemon(data.sprites.front_default))
    }

  return (
    <div>
        <div className='leaderboard-container'>
        <h3>Leaderboard</h3> 
        <ol>
        {leader.map(({ username, score, difficulty }, index) => (
            <li key={index}>{username} ---- Score: {score} ---- Difficulty: {difficulty}</li>
        ))}
        </ol>
        <img className='pokemon_img' src={pokemon}></img>
        <div className='form-container'>
        <form onSubmit={(e)=> submitToLeaderboard(e)}>
        <input 
        placeholder='Enter Username' 
        type ='text' 
        onChange={(e)=>setUser(e.target.value)} 
        required
        disabled={disable}>
        </input>
        <button className='submit-score-button' disabled={disable}>Submit Score</button>
        </form>
        <div className='button-container'>
        <button onClick={startGame}>Restart Game</button>
        <button onClick={getPokemon}>Easter Egg</button>
        </div>
        </div>
        </div>
    </div>
  )
}

export default SubmitScore