# Mastermind-Game
This is a web app recreation of the code-breaking game Mastermind.
This version uses numbers instead of colors. Read more about Mastermind here: [https://en.wikipedia.org/wiki/Mastermind_(board_game)](https://en.wikipedia.org/wiki/Mastermind_(board_game))

# Technologies Used
• React </br>
• Express </br>
• Node </br>
• PostreSQL/ElephantSQL </br>
• Jest <br/>
• React Testing Library </br>
• Supertest </br>
• babel </br>
• webpack </br>
• SASS/SCSS </br>
• JSDoc </br>
• Heroku </br>

# Setup
Deployed via Heroku: (https://mighty-ridge-64393.herokuapp.com) </br>
To run locally, clone repo and navigate to the root directory and run the following commands in terminal </br>
`npm install` </br>
`npm run build` </br>
`npm run start` </br>
View project in (http://localhost:3000/) </br>
For security purposes the .env file is git ignored. You will need need to contact me for DB_URI</br>

# Game Rules
• The objective of this game is to guess the secret number that is generated by the computer </br>
• At the start of the game the user will be prompted to select a difficulty level before starting </br>
    - Easy: The secret number is 4 digits long. Each integer will be from 0-4 inclusive. You have 10 attempts </br>
    - Medium: The secret number is 4 digits long. Each integer will be from 0-5 inclusive. You have 9 attempts </br>
    - Hard: The secret number is 5 digits long. Each integer will be from 0-6 inclusive. You have 8 attempts </br>
• At the end of each guess, the computer will provide one of the following responses as feedback: </br>
    - An X represents a number you guessed was correct but in the wrong location </br>
    - An O represents a number you guessed was correct and in the right location </br>
Note: The position of the X's and O's are not correlated to the position of the number in your guess or the secret number </br>

# API
Uses the Random API to generate random number combinations
API documentation: https://www.random.org/clients/http/api/

# Features
• Guess field [X] </br>
• Add support to show past guesses [X] </br>
• Add support to give hints after guess [X] </br>
• Leaderboard [X] </br>
• Configurable difficulty level [X] </br>
• Restart functionality [X] </br>
• Easter Egg [X] </br>

# Future Improvements
• Expand testing suites </br>
• Allow users to save session </br>

# Thought Process
My initial thought process was to first determine my tech stack. I choose React as my frontend library to create a simple UI. I decided to not use create-react-app and configured my own webpack and babel. For my backend, I choose Node/Express to keep the project to a singular language. I used a PostgresSQL/ElephantSQL for my database set up. 

After deciding my tech stack. I planned the MVP and the core features I needed to have working. For my MVP, I wanted to have a guess field, a history field that shows hints and past guesses, and a leaderboard. I created an algo that would accept a users guess, the target number, and return hint. In the hint, an 'X' would represent a number in the user guess was correct, but in the wrong location. An 'O' would represent a number in the user guess was correct in and in the right location. The location of the 'X's and 'O's in the hint are not correlated to the location of the numbers in the guess or the target number. The hint and history of guesses will also be available for the user to see throughout the game in a history field. 

If a user guesses the target number, the user will be prompted to create a user profile where they can submit their score to a leaderboard. The user profile will contain a username, score (# of guesses the user took to win), and the difficulty level the user played on. I implemented a ElephantSQL database where I could store users profile and create a leaderboard. After the user submits to the leaderboard, their profile will render on screen. I decided to rank users by how many guesses it took them to get the secret number (A low score is better here). 

After I achieved my MVP, the next feature I worked on was a configurable difficulty level. Before the start of the game the user will be prompted to select a difficulty level. Based on the difficulty selected, the target number will become increasingly larger, and the user will start off with less guesses. 

I also added an easter egg for users who successfully beat the game. Play to find out what it is :)

# Testing
This project uses Jest, Supertest, and React Testing Library for TDD. Navigate to root directory of project and </br>
run `npm run test` in terminal to view unit tests

# About the Author
Trevor Mow is a previous Critical Care Nurse turned Software Engineer in Los Angeles. You can find more information about him in the links below: </br>
[LinkedIn](https://www.linkedin.com/in/trevormow/) </br>
[GitHub](https://github.com/tmow12) </br>
