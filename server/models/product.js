const Sequelize = require('sequelize');
const sequelize  = require('../config/sequelize');
const Product = sequelize.define('products',{
    id:{ type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true 
        },
    name:{
        type: Sequelize.STRING,
        allowNull: false
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