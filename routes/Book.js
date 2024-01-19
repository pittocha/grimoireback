const express = require('express');
const bookCtrl = require('../controllers/Book')
const router = express.Router();

router.get('/bestrating', bookCtrl.getTopRatedBooks);
router.get('/:id', bookCtrl.getOneBook);
router.get('/', bookCtrl.getAllBooks);

module.exports = router;