const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid-v4');
const multer = require('multer');

module.exports = function (){

    const storage = multer.diskStorage({
        destination: './uploads/pdf',
        filename: function (req, file, cb){
            cb(null, `${uuidv4()}.pdf`);
        }
    });

    function fileFilter(req, file, cb){
        let mime = file.mimetype.split('/')[1];
        if (mime === 'pdf')
            cb(null, true);
        else
            cb(new Error(`${file.originalname} is not a PDF file!`));
    }

    const upload = multer({storage: storage, fileFilter});

    router.post('/', upload.array('files', 3), (req, res, next) =>{
        res.status(200).json(req.files.map((item) =>{
            return item.filename
        }));
    });

    return router;
}