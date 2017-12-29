var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var products = require('./server/routes/products');
app.use('/products', products);

const api = require('./server/routes/api');
app.use('/api', api);

// const sequelize = require('./server/routes/sequelize');
// app.use('/sequelize',sequelize);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world app.js is main');
}).listen(3000);