var conn = require('../config/db');
var express = require('express');

var multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads')
    }
//     ,
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
})
var upload = multer() 

var router = express.Router();

const file = require('../models/file');

router.get('/',function(req,res){

    file.findAll({
        order: [['name','ASC']]
    }).then(opt =>{
        res.json(opt);
    });
});

router.get('/:recordId/:app',function(req,res){
    var app = req.param('app')
    var recordId = req.param('recordId')

    file.findAll({
        where: { app: app, record_id: recordId},
        order: [['name','ASC']]
    }).then(f =>{
        res.json(f);
    });
});

router.get('/:id', function(req, res){
    const id = req.param('id')

    file.findById(id).then(f => {
        res.json(f)
    })
})

router.post('/upload-single', upload.single('file'), function(req,res, next) {
    console.log('upload single file')
    try{
        res.json('uploaded')
    }
    catch(err)
    {
        res.sendStatus(400)
    }
})

router.post('/upload', upload.array('photos',10), function(req,res, next) {
    console.log('upload multi files')
    try{
        //const col = await loadCo
        res.json('uploaded');
    }
    catch(err)
    {
        res.sendStatus(400);
    }
})


const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

module.exports = router;