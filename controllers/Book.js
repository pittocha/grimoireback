const Book = require('../models/Book');
const fs = require('fs');

exports.getTopRatedBooks = async (req, res, next) => {
    try {
        const topRatedBooks = await Book.find()
        .sort({ averageRating: -1 })//organisation des Books par rating décroissant
        .limit(3);//limite de la réponse au trois premier livres de la liste
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
