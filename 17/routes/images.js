const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid-v4');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');


module.exports = function (){

    const storage = multer.diskStorage({
        destination: './uploads/images',
        filename: function (req, file, cb){
            cb(null, `${uuidv4()}-master.png`);
        }
    });

    function fileFilter(req, file, cb){
        let mime = file.mimetype.split('/')[1];
        if (mime === 'png' || 'jpeg')
            cb(null, true);
        else
            cb(new Error(`${file.originalname} is not a PNG/JPEG file!`));
    }

    const upload = multer({storage, fileFilter});

    router.use('/', express.static(path.join(__dirname, '..', 'uploads', 'images')));

    router.post('/', upload.single('file'), (req, res, next) =>{
        let filesName = [];
        let uploadedFile = req.file;
        filesName.push(uploadedFile.filename);
        filesName.push(createNewImage(uploadedFile, 'preview', 800, 600));
        filesName.push(createNewImage(uploadedFile, 'thumbnail', 300, 180));
        res.json(filesName);
    });

    function createNewImage(file, suffix, x, y){
        let newName = createNewName(file.path, suffix);
        sharp(file.path)
            .resize(x, y)
            .toFile((newName), (err, info) =>{
                console.error(err);
            });
        return newName.split('\\')[2] || 'null';
    }

    function createNewName(name, replacer){
        return name.replace(/master/g, replacer);
    }

    return router;
}