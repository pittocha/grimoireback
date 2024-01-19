const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app = express();

//connexion à la base de donnée
mongoose.connect('mongodb+srv://kurulimpah:0SG8YULVXHWMlgN3@cluster0.rofwudt.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//gestion des erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Header', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use((req, res, next) => {
    res.json({ message: 'votre requète à bien été recue !' });
})

module.exports = app;