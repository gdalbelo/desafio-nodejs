require('dotenv/config');

const express = require('express');
const router = express.Router();
const axios = require('axios');

const Revendedor = require('../models/Revendedor');

router.post('/', async (req, res) => {
    const revendedor = new Revendedor({
        CPF: req.body.CPF,
        nomeCompleto: req.body.nomeCompleto,
        email: req.body.email,
        senha: req.body.senha
    });

    try {
        const newRevendedor = await revendedor.save();
        return res.json(newRevendedor);
    } catch(err) {
        return res.json({ message: err });
    }
})

router.post('/login', async (req, res) => {
    let revendedor;

    try {
        revendedor = await Revendedor.findOne({ email: req.body.email });
        if(revendedor.senha == req.body.password) {
            return res.json("Revendedor logado no sistema Cashback.");
        } else {
            return res.json("Senha ou email incorretos!");
        }
    }catch(err) {
        res.json({ message: "Revendedor não encontrado: " + err });
    }    
})

router.get('/:cpf/cashback', (req, res) => {
    const cpf = req.params.cpf;

    axios.get(`${process.env.BOTICARIO_API_URL}?cpf=${cpf}`)
    .then(response => {
        let cashback = response.data.body.credit;
        cashback = cashback.toFixed(2);
        return res.json({message: `Total de cashback: R$ ${cashback}`});
    })
    .catch(err => {
        return res.json({ message: "Erro ao recuperar valor de cashback: " + err });
    })

})

module.exports = router;