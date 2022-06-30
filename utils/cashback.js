function calcCashback(cashback, valor) {
    if(parseFloat(valor) <= 1000.00) {
        cashback.porcentagem = '10%';
        cashback.valor = valor;
    } else if(parseFloat(valor) > 1000.00 && parseFloat(valor) <= 1500.00) {
        cashback.porcentagem = '15%';
        cashback.valor = valor;
    } else if(parseFloat(valor) > 1500.00) {
        cashback.porcentagem = '20%';
        cashback.valor = valor;
    }
}

function betweenTwoNumber(valor, menor, maior) {
    if(valor > menor && valor < maior) {
        return true;
    } else {
        return false;
    }
}


module.exports = {calcCashback, betweenTwoNumber};