const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.json({ message: 'votre requète à bien été recue !' });
})

module.exports = app;