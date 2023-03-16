const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const DIR = './static/public/images';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|svg|tif|jfif|ico|mp4|mov|webm)$/)) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only images & videos formats are allowed!'));
        }
    }
});

module.exports = {
    upload
}