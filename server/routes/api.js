const express = require('express');
const router = express.Router();

const conn = require('./db');

/* GET api listing. */
// router.get('/', (req, res) => {
//   res.send('api works');
// });

//allow cors
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.get('/all', function(req, res){
    
        conn.query('SELECT id, name FROM test', function(err, rows, fields){
            if(err) throw err
    
            console.log(rows);
            res.send( rows );
        });
    });

//insert product
router.post('/add',function(req, res){       
    var name = req.body.name;
    //var price = req.body.price;
        var sql = "INSERT INTO test (name) VALUES (?)";
        conn.query(sql,[name], function (err, result) {
          if (err) throw err;
          console.log("1 record inserted, ID: " + result.insertId);
          res.send("1 record inserted, ID: " + result.insertId + " - "+name);
        });
});

//get product info by id /products/?id=
router.get('/:id', function(req, res) {
    var id = req.param('id');
    var token = req.param('token');

    conn.query('SELECT id, name FROM test WHERE id = ?',[id], function(err, rows, fields){
        if(err) throw err

        console.log(rows);
        res.send(rows);
    });
  });

//update product
router.put('/edit',function(req,res){
    var id = req.body.id;
    if(id < 1)
    {
        res.status(400).send('Invalid Product ID');
        return;
    }
    var name = req.body.name;
    var sql = "UPDATE test (name=?) WHERE id=?";
    conn.query(sql,[name,id], function (err, result) {
      if (err) throw err;
      console.log("1 record updated, ID: " + id);
      res.send("1 record updated, ID: " + id);
    });
});
    

module.exports = router;