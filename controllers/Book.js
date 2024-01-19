const Book = require('../models/Book');
const fs = require('fs');

exports.getTopRatedBooks = (req, res, next) => {
    try {
        const topRatedBooks = Book.find()
        .sort({ averageRating: -1 })
        .limit(3);
        res.json(topRatedBooks);
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({
        _id: req.params.id
    }).then(
        (book) => {
            res.status(200).json(book);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
}

exports.getAllBooks = (req, res,next) => {
    Book.find().then(
        (books) => {
            res.status(200).json(books);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}
