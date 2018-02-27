'use strict'

const Sequelize = require('sequelize');
const sequelize  = require('../config/sequelize');
const Option = sequelize.define('files',{
    id:{ type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true 
        },
    name:{
        type: Sequelize.STRING
    },
    temp_name:{
        type: Sequelize.STRING
    },
    app:{
        type: Sequelize.STRING 
    },
    size:{
        type: Sequelize.DOUBLE 
    },
    type:{
        type: Sequelize.STRING
    },
    record_id:{
        type: Sequelize.INTEGER
    },
    path:{
        type: Sequelize.STRING
    },
    created:{
        type: Sequelize.DATE
    }    
},
{
timestamps: false,
}
);

module.exports = Option;