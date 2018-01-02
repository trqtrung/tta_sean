'use strict'

const Sequelize = require('sequelize');
const sequelize  = require('../config/sequelize');
const Option = sequelize.define('options_lists',{
    id:{ type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true 
        },
    name:{
        type: Sequelize.STRING
    },
    key:{
        type: Sequelize.STRING 
    },
    value:{
        type: Sequelize.STRING 
    }    
},
{
timestamps: false,
}
);

module.exports = Option;