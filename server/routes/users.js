//import { defer } from '../../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bluebird';

var conn = require('../config/db');
var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
//var Q = require('q');
var config = require('../config/config.json');
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

router.post('/', function (req, res) {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    var hash = '';

    bcrypt.hash(password, 10, function (err, hash) {
        // Store hash in database
        if (hash) {
            console.log(hash)

            user.create({
                username: username,
                password: password,
                email: email,
                hash: hash
            }).then(u => {
                res.json(u.get())
            }).catch(err => {
                res.status(400)
                res.json(JSON.stringify({ message: err }))
            })
        }
        else {
            console.log(err)
        }
    });
});

router.post('/login',function(req,res){
    try
    {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        console.log('login ');

        user.findOne({where: {username: username}}).then(u =>{
            if(u)
            {
                if(u.hash)
                {
                    bcrypt.compare(password, u.hash, function(err, result) {
                        if(result) {
                            // Passwords match
                            console.log('password matched '+u.hash)

                            res.json({_id: user.id,
                                username: user.username,
                                fullname: user.fullname,
                                token: jwt.sign({sub : u.id}, config.secret)})
                        } else {
                            // Passwords are not match
                            console.log('passwords are not match '+u.hash)
                             // authentication failed

                            res.status(400)
                            res.json('password does not match')
                        } 
                    });
                }
                else
                {
                    res.status(400)
                    res.json(username + ' does not exist');
                }
            }
            else
            {
                res.status(400)
                res.json(username + ' does not exist');
            }
        })

        // this.authenticate(username, password).then(function(user){
        //     if(user){
        //         res.send(user)
        //     }
        //     else
        //     {
        //         res.status(400).send('username or password is incorrect');
        //     }
        // }).catch(function (err){
        //     res.status(400).send(err);
        // })
    }
    catch(e)
    {
        
    }  
})

exports.loginRequired = function(req, res, next){
    if(req.user){
        next()
    }
    else{
        return res.status(401).json({message: 'Unauthorized user!'})
    }
}

// function authenticate(username, password) {
//     console.log(username)
//     var deferred = Q.defer();
//     console.log(deferred)
//     //user.findOne({where: {username: username}})
//     user.findOne({ username: username }, function (err, user) {
//         if (err) deferred.reject(err.name + ': ' + err.message);
        
//         console.log(user.username)

//         if (user && bcrypt.compare(password, user.hash)) {
//             // authentication successful
//             deferred.resolve({
//                 _id: user.id,
//                 username: user.username,
//                 fullname: user.fullname,
//                 token: jwt.sign({ sub: user.id }, config.secret)
//             });
//         } else {
//             // authentication failed
//             deferred.resolve();
//         }
//     });
 
//     return deferred.promise;
// }

module.exports = router;