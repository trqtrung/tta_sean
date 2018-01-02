var conn = require('../config/db');
var express = require('express');

var router = express.Router();

const option = require('../models/optionlist');

router.get('/key/:key',function(req,res){
    var key = req.param('key');

    option.findAll({
        where: { key: key},
        order: [['name','ASC']]
    }).then(opt =>{
        res.json(opt);
    });
});

router.post('/',function(req,res){

    const name = req.body.name;
    const key = req.body.key;
    const value = req.body.value;

    option.create({
        name: name,
        key: key,
        value: value
    }).then(opt =>{ 
        res.json(opt.get())
    }).catch(err => {
        res.json(JSON.stringify({message: err}))
    })
});

module.exports = router;