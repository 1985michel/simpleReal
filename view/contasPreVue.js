



function getContasTratadas() {
    const preContas = testGetContas();

    gerarVariaveisDeApresentacaoParaConta(preContas);

    //console.log(preContas);

    return preContas;

}


function gerarVariaveisDeApresentacaoParaConta(preContas) {

    preContas.forEach(ct => {
        //ct.opcoesDeExibicao.logo = this.getLogo(ct.nome);
        getShowBooleans(ct);
    });

    getCoresDoHistorico(preContas);

}

function getCoresDoHistorico(preContas) {

    let valorAnterior = '';

    preContas.forEach(ct => {

        valorAnterior = ''

        ct.moneyTimeFlow.forEach(mt => {
            if (valorAnterior == '') {
                valorAnterior = mt.saldo;
            } else if (fromRealtoNumber(valorAnterior) > fromRealtoNumber(mt.saldo)) {
                mt.cor = 'red';
                valorAnterior = mt.saldo
            } else if (fromRealtoNumber(valorAnterior) < fromRealtoNumber(mt.saldo)) {
                mt.cor = 'green';
                valorAnterior = mt.saldo
            } else if (fromRealtoNumber(valorAnterior) == fromRealtoNumber(mt.saldo)) {
                mt.cor = 'blue';
                valorAnterior = mt.saldo
            }
        });

    });

}

function getLogo(nomeConta) {

    switch (nomeConta) {
        case 'Banco do Brasil':
            return '../imgs/logo-bb.png';
            break;

        case 'Nubank':
            return '../imgs/logo-nubank.png';
            break;

        case 'Banco Inter':
            return '../imgs/logo-inter.png';
            break;

        default:
            return '';
            break;
    }

}

function getShowBooleans(conta) {
    conta.opcoesDeExibicao.showHistory = false;
    conta.opcoesDeExibicao.showDetalhes = false;
}