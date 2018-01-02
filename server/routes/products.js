var conn = require('../config/db');
var express = require('express');

//var bodyParser = require('body-parser');

var router = express.Router();

const sproduct = require('../models/product');

//var app = express();
//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//allow cors
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET","PUT","POST");
    next();
  });

router.get('/all', function(req, res){

    conn.query('SELECT id, name, price FROM products', function(err, rows, fields){
        if(err) throw err

        console.log(rows);
        res.send(rows);
    });
});

//insert product
router.post('/add',function(req, res){       
    var name = req.body.name;
    if(name === null || name ==='' || price <= 0)
    {
        res.send(JSON.stringify({messeage:'Invalid input'}));
        return;
    }

    var price = req.body.price;
        var sql = "INSERT INTO products (name, price) VALUES (?, ?)";
        conn.query(sql,[name,price], function (err, result) {
          if (err) throw err;
          console.log("1 record inserted, ID: " + result.insertId);
          res.send(JSON.stringify({messeage:"1 record inserted, ID: " + result.insertId + " - "+name}));
        });
});

//get product info by id /products/?id=
router.get('/', function(req, res) {
    var product_id = req.param('id');
    var token = req.param('token');

    conn.query('SELECT id, name, price FROM products WHERE id = ?',[product_id], function(err, rows, fields){
        if(err) throw err

        console.log(rows);
        res.send(rows);
    });
  });

//update product
router.put('/edit',function(req,res){
    var product_id = req.body.id;
    if(product_id < 1)
    {
        res.status(400).send('Invalid Product ID');
        return;
    }
});

//sequelize
router.get('/s',function(req,res){
    sproduct.findAll().then(pros =>{
        res.json(pros);
    });
});

router.get('/s/:id', function(req, res) {
    var id = req.param('id');

if(id > 0)
{
    sproduct.findById(id).then(pros =>{
        res.send(pros);
    });
}
else
{
    sproduct.findAll().then(pros =>{
        res.json(pros);
    });
}

});

router.post('/s/',function(req,res){

    const newproduct = sproduct.build({
        name: req.body.name,
        price: req.body.price
    });

    newproduct.save().then(pro =>{
        res.send(pro.get('name') + ' has been created via sequelize');
    }).catch(error =>{
        res.json(error);
    });
});

router.put('/s/',function(req, res){

    const updateProduct = sproduct.build({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price
    });


    // updateProduct.save().then(pro =>{
    //     res.send(pro.get('name') + ' has been updated via sequelize');
    // }).catch(error =>{
    //     res.send(JSON.stringify({messeage:error}));
    // });

    sproduct.update({
        name: updateProduct.name,
        price: updateProduct.price
    },{
        where:{
            id: updateProduct.id
        }
    }).then(something => {
        res.json('updated product');
        console.log('updated');
    });
})

router.delete('/s/:id', (req,res) => {

    const id = req.params.id;

    sproduct.destroy({where:{id: id}}).then(deletedProduct => {
        res.json(`product id ${id} has been deleted via sequelize`);
        console.log('deleted via sequelize');
    })
    
})

module.exports = router;