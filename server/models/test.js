const Sequelize = require('sequelize');
const sequelize  = require('../config/sequelize');
const Test = sequelize.define('test',{
    id:{ type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true 
        },
    name:{
        type: Sequelize.STRING,
        allowNull: false
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

module.exports = Test;