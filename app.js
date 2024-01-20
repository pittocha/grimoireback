require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bookRoutes = require('./routes/Book');
const userRoutes = require('./routes/User');


const app = express();

//connexion à la base de donnée
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI,
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

//gestion des erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;