import React, { useState, useEffect } from 'react'

function SubmitScore({ score }) {

    const [user, setUser] = useState('');
    const [leader, setLeaders] = useState([])

    const getLeaders = useEffect(() => {
      fetch('http://localhost:3000/leaderboardScore')
      .then(res => res.json())
      .then(data => setLeaders(data))
    }, [])

   function submitToLeaderboard(e) {
       e.preventDefault();

       const userScore = {
           user: user,
           score: score,
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
        {leader.map(({ username, score }, index) => (
            <li key={index}>User: {username} Score: {score}</li>
        ))}
    </ol>
        <form onSubmit={(e)=> submitToLeaderboard(e)}>
        <input placeholder='Enter Username' onChange={(e)=>setUser(e.target.value)}></input>
        <button>Submit Score</button>
        </form>
    </div>
  )
}

export default SubmitScore