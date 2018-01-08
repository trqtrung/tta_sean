'use strict'

const Sequelize = require('sequelize');
const sequelize  = require('../config/sequelize');
const bcrypt = require('bcrypt');

const User = sequelize.define('users',{
    id:{ 
        type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true 
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    hash:{
        type: Sequelize.STRING,
        allowNull: false
    },
    salt:{
        type: Sequelize.STRING
    },
    mobile:{
        type: Sequelize.STRING,
        validate:{
            len:{ 
                args: [6,20],
                msg: 'Mobile number lenght between6 and 20'
            }
        }
    },
    email:{
        type: Sequelize.STRING,
        unique: true,
        validate:{
            isEmail: {
                msg: 'Invalid email address'
            }
        }
    },
    fullname:{
        type: Sequelize.STRING,
        validate:{
            is: ["^[a-z]+$",'i'],     // will only allow letters
        }
    },
    birthday:{
        type: Sequelize.DATE,
        validate:{
            isDate: true
        }
    },
    created:{
        type: Sequelize.DATE
    }
},
{
    timestamps: false,
}
);

// User.beforeCreate(function(user, options){
//     return cryptPassword(user.password)
//       .then(success => {
//         user.password = success;
//       })
//       .catch(err => {
//         if (err) console.log(err);
//       });
// });

// function cryptPassword(password) {
//     console.log("cryptPassword" + password);
//     return new Promise(function(resolve, reject) {
//       bcrypt.genSalt(10, function(err, salt) {
//         // Encrypt password using bycrpt module
//         if (err) return reject(err);
  
//         bcrypt.hash(password, salt, null, function(err, hash) {
//           if (err) return reject(err);
//           return resolve(hash);
//         });
//       });
//     });

module.exports = User;