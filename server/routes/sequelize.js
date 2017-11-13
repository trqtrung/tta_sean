// const express = require('express');
// const router = express.Router();

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const sequelize = new Sequelize('tta', 'root', 'trung1992',{
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: Op,
    pool:{
        max:5,
        min:0,
        //acquire: 30000,
        idle:10000
    },  
});

// Sync all models that aren't already in the database
sequelize.sync();

// Force sync all models
//sequelize.sync({force: true})

// Drop all tables
//sequelize.drop()

//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

/* GET api listing. */
// router.get('/', (req, res) => {
//   sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//   }).catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
// });

module.exports = sequelize;
