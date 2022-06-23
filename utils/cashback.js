function calcCashback(cashback, valor) {
    if(parseFloat(valor) <= 1000.00) {
        cashback.porcentagem = '10%';
        cashback.valor = valor * 0.10;
    } else if(parseFloat(valor) > 1000.00 && parseFloat(valor) <= 1500.00) {
        cashback.porcentagem = '15%';
        cashback.valor = valor * 0.15;
    } else if(parseFloat(valor) > 1500.00) {
        cashback.porcentagem = '20%';
        cashback.valor = valor * 0.20;
    }
}

module.exports = calcCashback;