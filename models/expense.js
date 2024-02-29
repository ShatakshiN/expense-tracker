const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Expense = sequelize.define('Expense',{

    id :{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        notNull : false,
        primaryKey : true

    },

    amount : {
        type : Sequelize.DOUBLE,
        notNull : false
    },

    productName : {
        type : Sequelize.STRING,
        notNull : false
    } 

});

module.exports = Expense;
