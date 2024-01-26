const express = require('express');
const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/Book');
const { upload, sharpMiddleware } = require('../middleware/multer-config');
const router = express.Router();

router.post('/', auth, upload, sharpMiddleware, bookCtrl.createBook);
router.get('/bestrating', bookCtrl.getTopRatedBooks);
router.get('/:id', bookCtrl.getOneBook);
router.get('/', bookCtrl.getAllBooks);
router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;