//want supertest to use to whatever port it wants when testing
//need to export app from server.js without starting the server
//in production, will start server here
//in testing, supertest will start the server with it's own port
const app = require('./server');
const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))