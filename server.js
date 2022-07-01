require('dotenv/config');

const express = require('express');
const mongoose = require('mongoose');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const revendedor = require('./routes/revendedor');
const vedas = require('./routes/vendas');
server.use('/revendedor', revendedor);
server.use('/venda', vedas);
const {calcCashback} = require('./utils/cashback');

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) return console.log("Error connecting to database: " + err);

    console.log("Connected to Mongo database");
})

server.listen(3000, () => {
    let cashback = {cashback: 0, valor: 0};
    console.log('Cashback1: ' + calcCashback(350).toFixed(2));
    console.log('Valor1: ',calcCashback(350).toFixed(2), '10%', 350);
    calcCashback(cashback, 1350.99);
    console.log('Cashback3: ' + calcCashback(1240).toFixed(2));
    console.log('Valor3: ',calcCashback(1240).toFixed(2), '15%', 1240);
    calcCashback(cashback, 1502.00);
    console.log('Cashback2: ' + calcCashback(2300.40).toFixed(2));
    console.log('Valor2: ',calcCashback(2300.40).toFixed(2), '20%', 2300.40);
    console.log("Server running on port 3000");
})
