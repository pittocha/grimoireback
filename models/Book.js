const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    userId: { Type: String, required: true },
    title: { Type: String, required: true },
    author: { Type: String, required: true },
    imageUrl: { Type: String, required: true },
    year: { Type: Number, required: true },
    genre: { Type: String, required: true },
    ratings: [
        {
            userId: { Type: String, required: true },
            grade: { Type: Number, required: true },
        }
    ],
    averageRating: { Type: Number, required: true }
});

module.exports = mongoose.model('Book', bookSchema);