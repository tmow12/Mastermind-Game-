const express = require('express');
const path = require('path');
const app = express();

const apiRouters = require('./routers/api');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../dist")));

app.use('/', apiRouters);

app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../dist'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../dist/index.html'))
    })
}

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;