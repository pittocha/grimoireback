const express = require('express');
const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/Book');
const { upload, sharpMiddleware } = require('../middleware/multer-config');
const router = express.Router();

router.put('/:id', auth, upload, sharpMiddleware, bookCtrl.modifyBook);//requette http (ici put), execution des middleware(l'ordre est important d'abord auth pour l'othentification puis le reste) ensuite le controleur qui au final appellera une responce
router.post('/:id/rating', auth, bookCtrl.rateBook);
router.post('/', auth, upload, sharpMiddleware, bookCtrl.createBook);
router.get('/bestrating', bookCtrl.getTopRatedBooks);
router.get('/:id', bookCtrl.getOneBook);
router.get('/', bookCtrl.getAllBooks);
router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;