


const compromissosDoMes = [
    { descricao: 'Água', valor: 'R$ 10,00', vencimento: '01/01/2000', isPago: 'false' },
    { descricao: 'Energia', valor: 'R$ 10,00', vencimento: '01/01/2000', isPago: 'false' },
    { descricao: 'Seguro', valor: 'R$ 10,00', vencimento: '01/01/2000', isPago: 'false' },
    { descricao: 'Escola', valor: 'R$ 10,00', vencimento: '01/01/2000', isPago: 'true' },
    { descricao: 'Pneu', valor: 'R$ 10,00', vencimento: '01/01/2000', isPago: 'false' }
]

function constroiCompromissosDoMes() {
    let compArray = [];

    for (let index = 0; index < compromissosDoMes.length; index++) {
        const c = compromissosDoMes[index];

        const nc = new CompromissoAvulso(c.descricao, c.valor, c.vencimento);

        nc.isPago = c.isPago;

        compArray.push(nc);


    }

    return compArray;
}

function testeGetCompromissosDoMes() {
    return constroiCompromissosDoMes();
}