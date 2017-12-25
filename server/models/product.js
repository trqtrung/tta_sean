'use strict'

const Sequelize = require('sequelize');
const sequelize  = require('../config/sequelize');
const Product = sequelize.define('products',{
    id:{ type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true 
        },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        isUnique: function (name, done){
            Product.find({where:{name: name}}).then(function(product){
                if(product){
                    throw new Error('Product name already in use');
                }
            });
        }
    },
    price:{
        type: Sequelize.DECIMAL(10, 2) 
    }    
},
{
timestamps: false,
}
);

// Product.findAll().then(products =>{
//     console.log(products);
// });

// Product.findOne().then(product => {
//     console.log(product.get('name'));
// });

module.exports = Product;