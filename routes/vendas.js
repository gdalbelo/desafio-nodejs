const express = require('express');
const router = express.Router();

const Sale = require('../models/Vendas');
const Revendedor = require('../models/Revendedor');

const calcCashback = require('../utils/cashback');

router.post('/', async (req, res) => {
    let { CPF, valor } = req.body;
    let cashback = {porcentagem: 0, valor: 0};
    let status = CPF == '15350946056' ? "Aprovado" : "Em validação";
    let contador = 0;
    let vendas = [];

    const ano = new Date().getFullYear();

    await Revendedor.findOne({ cpf: CPF }).populate('vendas').exec((err, foundRevendedor) => {
        if(err) return res.json({ message: "Erro ao carregar vendedor" });

        vendas = foundRevendedor.vendas;
    })

    if(vendas.length == 0) {
        contador = 1;
    } else {
        let ultimaVenda = vendas[vendas.length-1];
        let ultimoContador = ultimaVenda.codigo;
        ultimoContador = ultimoContador.substr(14);
        contador = parseInt(ultimoContador) + 1;
    }

    calcCashback(cashback, valor);

    const venda = new Sale({
        codigo: `${ano}${CPF}${contador}`,
        CPF,
        valor: valor.toString(),
        cashback,
        status
    });

    try{
        const novaVenda = await venda.save();
        Revendedor.findOne({ CPF: novaVenda.CPF }, (err, foundRevendedor) => {
            if(err) {
                return res.json({ message: "Revendedor não encontrado"});
            } else {
                foundRevendedor.vendas.push(novaVenda);
                foundRevendedor.save();
            }
        })
        return res.json(novaVenda);
    } catch(err) {
        return res.json({ message: err });
    }

})

router.put('/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    let { CPF, valor } = req.body;
    let cashback = {porcentagem: 0, valor: 0};

    calcCashback(cashback, valor);

    const venda = new Sale({
        codigo,
        CPF,
        valor: valor.toString(),
        cashback
    });


    try {
        const foundVenda = await Sale.findOne({ codigo: codigo });

        if(foundVenda.status === 'Aprovado') return res.json({ message: 'Venda aprovada - não é possível editar' });

        try {
            const updatedVenda = await Sale.updateOne({ _id: foundVenda._id }, {
                $set: {
                    codigo: venda.codigo,
                    CPF: venda.CPF,
                    valor: venda.valor,
                    cashback: venda.cashback,
                }
            })

            return res.json(updatedVenda);
        } catch(err) {
            return res.json({ message: "Erro ao editar a venda "});
        }
    } catch(err) {
        return res.json({ message: 'Código de venda inválido.'});
    }
    
})

router.delete('/:codigo', async (req, res) => {
    try {
        const foundVenda = await Sale.findOne({ codigo: req.params.codigo });

        if(foundVenda.status === "Aprovado") return res.json({ message: "Venda aprovada - não pode ser removida" });

        try{
            const removeVenda = await Sale.deleteOne({ _id: foundVenda._id });
            return res.json({ message: "Removida a venda com sucesso!"});
        } catch(err) {
            return res.json({ message: "Erro ao deletar a venda" });
        }
    } catch(err) {
        return res.json({ message: "Venda não encontrada: " + err });
    }
})

module.exports = router;
