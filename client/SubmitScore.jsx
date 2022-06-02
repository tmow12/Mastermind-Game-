import React, { useState } from 'react'

function SubmitScore({ score }) {

    const [user, setUser] = useState('');

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
       });
    }

  return (
    <div>
        <form onSubmit={(e)=> submitToLeaderboard(e)}>
        <input placeholder='Enter Username' onChange={(e)=>setUser(e.target.value)}></input>
        <button>Submit Score</button>
        </form>
    </div>
  )
}

export default SubmitScore