var conn = require('../config/db');
var express = require('express');
const Sequelize = require('sequelize');
var router = express.Router();

const supplier = require('../models/supplier');

router.get('/',function(req,res){
    supplier.findAll({
        order: [['name','ASC']]
    }).then(sup =>{
        res.json(sup);
    });
});

router.get('/:id', function(req, res){
    const id = req.param('id')

    supplier.findById(id).then(sup => {
        res.json(sup)
    })
})

router.post('/',function(req,res){
    console.log('supplier post is called')
    supplier.create({
        name: req.body.name,
        contact_name: req.body.contact_name,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        product_type: req.body.product_type,
        created: Sequelize.fn('NOW')
    }).then(sup =>{ 
        res.json(sup.get())
    }).catch(err => {
        res.json(JSON.stringify({message: err}))
    })
});

router.put('/',function(req, res){
    console.log('supplier put is called')
    supplier.update({
        name: req.body.name,
        contact_name: req.body.contact_name,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        product_type: req.body.product_type
    },{
        where:{
            id: req.body.id
        }
    }).then(something => {
        res.json('updated supplier');
        console.log('updated supplier');
    });
})

module.exports = router;