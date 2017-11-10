var conn = require('./db');
var express = require('express');

//var bodyParser = require('body-parser');

var router = express.Router();


//var app = express();
//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
    var price = req.body.price;
        var sql = "INSERT INTO products (name, price) VALUES (?, ?)";
        conn.query(sql,[name,price], function (err, result) {
          if (err) throw err;
          console.log("1 record inserted, ID: " + result.insertId);
          res.send("1 record inserted, ID: " + result.insertId + " - "+name);
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

module.exports = router;