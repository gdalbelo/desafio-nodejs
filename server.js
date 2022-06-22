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

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) return console.log("Error connecting to database: " + err);

    console.log("Connected to Mongo database");
})

server.listen(3000, () => {
    console.log("Server running on port 3000");
})
