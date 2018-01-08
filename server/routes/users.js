var conn = require('../config/db');
var express = require('express');
var bcrypt = require('bcrypt');

var router = express.Router();

const user = require('../models/user');

router.get('/',function(req,res){

    user.findAll({
        order: [['fullname','ASC']]
    }).then(opt =>{
        res.json(opt);
    });
});

router.get('/:id', function(req, res){
    const id = req.param('id')

    user.findById(id).then(u => {
        res.json(u)
    })
})

router.post('/',function(req,res){

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    var hash= '';

    bcrypt.hash(password, 10, function(err, hash) {
        // Store hash in database
        if(hash)
        {
            console.log(hash)

        user.create({
            username: username,
            password: password,
            email: email,
            hash: hash
        }).then(u =>{ 
            res.json(u.get())
        }).catch(err => {
            res.json(JSON.stringify({message: err}))
        })
    }
    else
    {
        console.log(err)
    }
      });
});

router.post('/login',function(req,res){

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    console.log('login ');

    var isOk = false;

    const userHash = getUserHash(username);

    console.log(userHash);

    if(userHash.hash != '')
    {
        bcrypt.compare(password, userHash.hash, function(err, result) {
            if(result) {
             // Passwords match
             console.log('password matched '+userHash.hash)
             res.json('logged')
            } else {
             // Passwords don't match
             console.log('passwords are not match '+userHash.hash)
             res.json('error')
            } 
          });
    }
    else
    {
        res.json(username + ' does not exist');
    }
});

var getUserHash = function(username)
{
    console.log('get user hash called')

    var hash='';

    return user.findOne({where: {username: username}})
    //console.log('_hash: ' + hash);
    return hash;
}

module.exports = router;