import React, { useState, useEffect } from 'react'

function SubmitScore({ score, difficulty }) {

    const [user, setUser] = useState('');
    const [leader, setLeaders] = useState([])

    useEffect(() => {
      fetch('http://localhost:3000/leaderboardScore')
      .then(res => res.json())
      .then(data => setLeaders(data))
    }, [])

    /**
     * This function accepts a synethic event. It creates a user profle, and submits this to the leaderboard
     * @param {Object} e 
     */
   function submitToLeaderboard(e) {
       e.preventDefault();

       const userScore = {
           user: user,
           score: score,
           difficulty: difficulty
       };

       fetch('http://localhost:3000/leaderboard', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(userScore),
       })
        .then(res => res.json())
        .then(response => setLeaders(response))
    }

  return (
    <div>
        <h3>Leaderboard</h3> 
        <ol>
        {leader.map(({ username, score, difficulty }, index) => (
            <li key={index}>{username} Score: {score} Difficulty: {difficulty}</li>
        ))}
    </ol>
        <form onSubmit={(e)=> submitToLeaderboard(e)}>
        <input placeholder='Enter Username' onChange={(e)=>setUser(e.target.value)}></input>
        <button className='submit-score-button'>Submit Score</button>
        </form>
    </div>
  )
}

export default SubmitScore