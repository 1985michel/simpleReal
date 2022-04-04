

/* const compromissos = [
    { descricao: 'Conta de Energia', valor: 'R$ 100,00', vencimentoInicial: '01/01/2000', recorrencia: 'Mensal', qtdParcelas: '1', qtdParcelasFuturas: '1' },
    { descricao: 'Supermercado', valor: 'R$ 200,00', vencimentoInicial: '01/01/2000', recorrencia: 'Mensal', qtdParcelas: '2', qtdParcelasFuturas: '1' },
    { descricao: 'Gasolina', valor: 'R$ 300,00', vencimentoInicial: '01/01/2000', recorrencia: 'Mensal', qtdParcelas: '3', qtdParcelasFuturas: '1' },
    { descricao: 'Plano de Saúde', valor: 'R$ 400,00', vencimentoInicial: '01/01/2000', recorrencia: 'Mensal', qtdParcelas: '', qtdParcelasFuturas: '1' },
    { descricao: 'Escola', valor: 'R$ 500,00', vencimentoInicial: '01/01/2000', recorrencia: 'Mensal', qtdParcelas: '12', qtdParcelasFuturas: '1' },
    { descricao: 'Seguro', valor: 'R$ 600,00', vencimentoInicial: '01/01/2000', recorrencia: 'Mensal', qtdParcelas: '5', qtdParcelasFuturas: '1' }
] */


const compromissos = [];


function constroiCompromissos() {

    let compArray = [];

    for (let index = 0; index < compromissos.length; index++) {
        const c = compromissos[index];

        compArray.push(new CompromissoPai(c.descricao, c.valor, c.vencimentoInicial, c.recorrencia, c.qtdParcelas, c.qtdParcelasFuturas));

    }

    return compArray;
}



function testeGetCompromissos() {
    return constroiCompromissos();
}


