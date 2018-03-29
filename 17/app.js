const express = require('express');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname+'-master');
    }
});

const images =require('./routes/images.js')();
const pdf =require('./routes/pdf')();

const upload = multer({ storage: storage });

const app = express();

app.use('/',express.static(__dirname+'/public'));
app.use('/pdf',pdf);
app.use('/images',images);

app.post('/upload', upload.single('file'), (req, res, next) => {
    console.log(req.body);
    res.json({ succeed: true });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));


const xmlbuilder = require('xmlbuilder');

let koko = xmlbuilder.build({
    root: {
        xmlbuilder: {
            repo: {
                '@type': 'git', // attributes start with @
                '#text': 'git://github.com/oozcitak/xmlbuilder-js.git' // text node
            }
        }
    }
});

console.log(koko);