'use strict'

const Sequelize = require('sequelize');
const sequelize  = require('../config/sequelize');
const Supplier = sequelize.define('suppliers',{
    id:{ type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true 
        },
    name:{
        type: Sequelize.STRING
    },
    contact_name:{
        type: Sequelize.STRING
    },
    phone:{
        type: Sequelize.JSON 
    },
    address:{
        type: Sequelize.JSON 
    },
    email:{
        type: Sequelize.JSON
    },
    product_type:{
        type: Sequelize.JSON
    },
    created:{
        type: Sequelize.DATE,      
    },
    updated:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
},
{
timestamps: false,
}
);

module.exports = Supplier;