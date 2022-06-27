import calcCashback from "../utils/cashback";

test('Para até 1.000 reais em compras, o revendedor(a) receberá 10% de cashback do valor vendido no período de um mês (sobre a soma de todas as vendas)', () => {
    let cashback = {porcentagem: 0, valor: 0};
    calcCashback(cashback, 890.50);
    expect(cashback.valor < 1000).toBe(cashback.porcentagem === '10%');
})
test('Entre 1.000 e 1.500 reais em compras, o revendedor(a) receberá 15% de cashback do valor vendido no período de um mês (sobre a soma de todas as vendas)', () => {
    let cashback = {porcentagem: 0, valor: 0};
    calcCashback(cashback, 1350.99);
    expect(cashback.valor >= 1000.00 && cashback.valor <= 1500.00).toBe(cashback.porcentagem === '10%');
})
test('Acima de 1.500 reais em compras, o revendedor(a) receberá 20% de cashback do valor vendido no período de um mês (sobre a soma de todas as vendas).', () => {
    let cashback = {porcentagem: 0, valor: 0};
    calcCashback(cashback, 1500.01);
    expect(cashback.valor >= 1500.00).toBe(cashback.porcentagem === '20%');
})