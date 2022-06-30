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
    let cashback = {porcentagem: 0, valor: 0};
    calcCashback(cashback, 350.99);
    console.log(cashback.valor > 1500, cashback.valor);
    console.log((cashback.valor <= 1000.00), cashback.valor);
    console.log('Valor1: ',cashback.valor, cashback.porcentagem);
    calcCashback(cashback, 1502.00);
    console.log(cashback.valor > 1500, cashback.valor);
    console.log((cashback.valor > 1000 && cashback.valor < 1500), cashback.valor);
    console.log('Valor2: ',cashback.valor, cashback.porcentagem);
    calcCashback(cashback, 1350.99);
    console.log(cashback.valor > 1500, cashback.valor);
    console.log((cashback.valor > 1000 && cashback.valor < 1500), cashback.valor);
    console.log('Valor3: ',cashback.valor, cashback.porcentagem);
    console.log("Server running on port 3000");
})
