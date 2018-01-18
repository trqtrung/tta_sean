var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var expressJwt = require('express-jwt');
var config = require('./server/config/config.json');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
  secret: config.secret,
  getToken: function (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
          return req.query.token;
      }
      return null;
  }
}).unless({ path: ['/users/login', '/users/register'] }));//apis do not need to authenticate - allow anonymous

var products = require('./server/routes/products');
app.use('/products', products);

const api = require('./server/routes/api');
app.use('/api', api);

const options = require('./server/routes/optionslists');
app.use('/optionslists',options);

const users = require('./server/routes/users');
app.use('/users',users);

// const sequelize = require('./server/routes/sequelize');
// app.use('/sequelize',sequelize);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world app.js is main');
}).listen(3000);