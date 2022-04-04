

//isRendaPassiva, ativoResponsavel, descricao, valor, contaDeRecebimento, dataRecebimento

const recebimentos = [
    { isRendaPassiva: false, ativoResponsavel: 'tempo', descricao: 'Salário', valor: 'R$ 10.000,00', contaDeRecebimento: 'Banco do Brasil', dataRecebimento: '01/01/2000' },
    { isRendaPassiva: false, ativoResponsavel: 'tempo', descricao: 'Salário Esposa', valor: 'R$ 10.000,00', contaDeRecebimento: 'Banco do Brasil', dataRecebimento: '01/01/2000' },
    { isRendaPassiva: true, ativoResponsavel: 'imóvel', descricao: 'Aluguel', valor: 'R$ 10.000,00', contaDeRecebimento: 'Banco do Brasil', dataRecebimento: '01/01/2000' },
    { isRendaPassiva: true, ativoResponsavel: 'KNRI11', descricao: 'Salário', valor: 'R$ 10.000,00', contaDeRecebimento: 'Banco do Brasil', dataRecebimento: '01/01/2000' },
    { isRendaPassiva: true, ativoResponsavel: 'IVVB11', descricao: 'Salário', valor: 'R$ 10.000,00', contaDeRecebimento: 'Banco do Brasil', dataRecebimento: '01/01/2000' }
]


function constroiRecebimentos() {

    let recArray = [];

    for (let index = 0; index < recebimentos.length; index++) {
        const r = recebimentos[index];

        const rec = new Recebimento(r.isRendaPassiva, r.ativoResponsavel, r.descricao, r.valor, r.contaDeRecebimento, r.dataRecebimento);

        recArray.push(rec);

    }

    return recArray;

}

function testeGetRecebimentos() {
    return constroiRecebimentos();
}