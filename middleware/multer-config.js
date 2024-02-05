const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single('image');//sert pour utiliser express.static

const sharpMiddleware = (req, res, next) => {
    if (!req.file) {
        return next();
    }
    const { buffer, originalname }= req.file;
    const timestamp = Date.now();
    const filename = `${timestamp}_${originalname}.webp`;// renommer le fichier
    const filePath = path.join(__dirname, '../images', filename);
    sharp(buffer)
    .resize(360, 568)//image redimensionné
    .webp({ quality: 75 })//conversion de l'image au format webp
    .toFile(filePath, (err, info) => {
        if (err) {
            return next(err);
        }
        req.file.path = filePath;
        next();
    });
;}

module.exports = {upload: upload, sharpMiddleware: sharpMiddleware};