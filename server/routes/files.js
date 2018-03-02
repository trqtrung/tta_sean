var conn = require('../config/db')
var express = require('express')

var path = require('path')
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads')
    }
     ,
   filename: function (req, file, cb) {
     cb(null,  Date.now() + path.extname(file.originalname))
   }
})
var upload = multer({storage: storage}) 

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
    console.log('upload single file'+req.file.filename + '-'+req.file.originalname)
    try{
        file.create({
            name: req.file.originalname,         
            path: req.file.path,
            size: req.file.size,
            type: req.file.mimetype,
            app: req.body.app,
            record_id: req.body.id
        }).then(f => { 
            res.json(f.get())
        }).catch(err => {
            res.json(JSON.stringify({message: err}))
        })
    }
    catch(err)
    {
        res.sendStatus(400)
        res.json({message: err})
    }
})

router.post('/upload', upload.array('files',10), function(req,res, next) {
    console.log('upload multi files')
    try{
        // array.forEach(element => {
        //     file.create({
        //         name: req.file.originalname,         
        //         path: req.file.path,
        //         size: req.file.size,
        //         type: req.file.mimetype,
        //         app: req.body.app,
        //         record_id: req.body.id
        //     }).then(f => { 
        //         res.json(f.get())
        //     }).catch(err => {
        //         res.json(JSON.stringify({message: err}))
        //     })
        // });
        var files = req.files

        if(files){
            files.forEach(function(f){
                file.create({
                    name: f.originalname,         
                    path: f.path,
                    size: f.size,
                    type: f.mimetype,
                    app: req.body.app,
                    record_id: req.body.id
                }).then( result => console.log(result.get()))
                
            })
            // .then(result => {
                console.log('finished')
                 res.json(JSON.stringify({message: 'success'}))
                 res.end()
            // })
        }
        else
        {
            console.log('no files')
            //res.sendStatus(400)
            res.send('no upload files found')
            res.end()
        }
    }
    catch(err)
    {
        console.log('error')
        //res.sendStatus(400)
        res.json({message: err})
        res.end()
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