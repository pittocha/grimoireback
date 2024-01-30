const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');

exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${path.basename(req.file.path)}`
    } : {...req.body};

    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
    .then((book) => {
        if (book.userId != req.auth.userId) {
            res.status(403).json({ message: 'Unauthorized request' });
        } else {
            Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
            .then(() => res.status(200).json({ message: 'Livre modifié!' }))
            .catch(error => res.status(401).json({ error }));
        }
    })
    .catch((error) => {
        res.status(400).json({error});
    })
};

exports.rateBook = async (req, res, next) => {
    const { userId, rating } = req.body;
    const bookId = req.params.id;

    try {
        //recherche du livre par Id
        const book = await Book.findOne({ _id: bookId });
        if(!book) {
            return res.status(404).json({ message: 'Livre non trouvé.' });
        }
        //vérification si l'utilisateur à déja noté ce livre
        const existingRating = book.ratings.find(r => r.userId === userId);
        if (existingRating) {
            return res.status(400).json({ message: 'Ce livre est déja évalué.' });
        }
        //Ajout de la nouvelle note
        book.ratings.push({ userId, grade: rating });
        //calcul de la nouvelle note
        const totalRatings = book.ratings.length;
        const sumRatings = book.ratings.reduce((acc, cur) => acc + cur.grade, 0);
        book.averageRating = sumRatings / totalRatings;
        //enregistrer les modifications dans la base de données.
        const updatedBook = await book.save();
        return res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erreur serveur.' });
    }
};

exports.createBook = async (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${path.basename(req.file.path)}`;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: imageUrl
    });
    book.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch (error => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
    .then( book => {
        if (book.userId != req.auth.userId) {
            res.status(403).json({ message: 'Unauthorized request' });
        } else {
            const filename = book.imageUrl.split('/images')[1];
            fs.unlink(`images/${filename}`, () => {
                Book.deleteOne({_id: req.params.id})
                .then(() => { res.status(200).json({message: 'Objet supprimer !'})})
                .catch(error => res.status(401).json({ error }));
            });
        }
    })
    .catch( error => {
        res.status(500).json({ error });
    })
};

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
    Book.find()
    .then((books) => {res.status(200).json(books)})
    .catch((error) => {res.status(400).json({error: error})});
};
