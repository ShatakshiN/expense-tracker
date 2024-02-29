const http = require('http');
const express = require('express');
const app = express();
const Expense = require('./models/expense');
var cors  = require('cors');
const Sequelize = require('sequelize');
const sequelize = require('./util/database')
const bodyParser = require('body-parser');
const { start } = require('repl');

app.use(cors());

app.use(bodyParser.json());

app.post('/add-users', async (req,res,next) =>{
    try{
        if (!/^\d+$/.test(req.body.amount)){
            throw new Error('invalid amount entered')
        };

        if(!req.body.amount){
            throw new Error('amount required')
        };

        if(!req.body.productName){
            throw new Error('product name required')
        }

        const amount = req.body.amount;
        const productName = req.body.productName;

        const data  = await Expense.create({
            amount : amount,
            productName : productName
        });

        res.status(201).json({userDetails : data});

    }catch(error){
            res.status(500).json({error: error.message})
        
    }
    
});

app.get('/add-users',async(req,res,next) =>{

    try{
        const users = await Expense.findAll();
        res.status(200).json({allUserOnScreen : users})
    }catch(error){
        res.status(500).json({error : error.message})
    };

});

app.delete('/delete-user/:userId', async(req,res,next)=>{

    const userId = req.params.userId

    try{
        const user = await Expense.findByPk(userId);
        if (!user){
            throw new Error('userId not found');
        }

        await user.destroy();
        res.status(200).json({error : 'user deleted successfully'})

    }catch(error){

        res.status(500).json({error  : error.message})
       
    }

});


sequelize.sync()
    .then(user =>{
        //console.log(user);
        app.listen(4000);
        console.log('server is running')

    })
    .catch(err => console.log(err));



