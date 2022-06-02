import React, { useState, useEffect } from 'react'

function Leaderboard() {

  const [leader, setLeaders] = useState([])

  const getLeaders = useEffect(() => {
    fetch('http://localhost:3000/leaderboardScore', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => setLeaders(data))
  }, [])

  return (
    <div>
    <h3>Leaderboard</h3>
    <ul>
        {leader.map(({ username, score }, index) => (
            <li key={index}>User: {username} Score: {score}</li>
        ))}
    </ul>
    </div>
  )
}

export default Leaderboard