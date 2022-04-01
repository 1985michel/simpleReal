


function getContasTratadas() {
    const preContas = testGetContas();

    gerarVariaveisDeApresentacaoParaConta(preContas);

    console.log(preContas);

    return preContas;

}


function gerarVariaveisDeApresentacaoParaConta(preContas) {

    preContas.forEach(ct => {
        ct.opcoesDeExibicao.push({ 'logo': this.getLogo(ct.nome) });
        getShowBooleans(ct);
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
    conta.opcoesDeExibicao.push({ 'showHistory': false });
}