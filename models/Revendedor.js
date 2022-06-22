const mongoose = require('mongoose');

const RevendedoresSchema = mongoose.Schema({
    CPF: {
        type: String,
        required: true
    },
    nomeCompleto: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    vendas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venda"
    }]
})

module.exports = mongoose.model('Revendedor', RevendedoresSchema);