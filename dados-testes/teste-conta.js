


const logos = [{ nome: 'Banco do Brasil', img: '../imgs/logo-bb.png' }, { nome: 'Nubank', img: '../imgs/logo-nubank.png' }, { nome: 'Inter', img: '../imgs/logo-inter.png' }];

function getLogos() {
    return logos;
}


const contas = [
    { nome: 'Banco do Brasil', logo: '../imgs/logo-bb.png', carteira: 'Família', saldo: 'R$ 15.623,00', moneyTimeFlow: [{ data: '01/05/2021', hora: '01:01:01', valor: 'R$ 1.000,00' }, { data: '01/02/2021', hora: '01:01:01', valor: 'R$ 2.000,00' }, { data: '03/06/2022', hora: '01:01:01', valor: '- R$ 5000,00' }] },
    { nome: 'Nubank', logo: '../imgs/logo-nubank.png', carteira: 'Família', saldo: 'R$ 15.623,00', moneyTimeFlow: [{ data: '01/01/2022', hora: '01:01:01', valor: 'R$ 1.000,00' }, { data: '02/02/2021', hora: '01:01:01', valor: 'R$ 2.000,00' }, { data: '03/03/2021', hora: '01:01:01', valor: 'R$ 3.000,00' }] },
    { nome: 'Banco Inter', logo: '../imgs/logo-inter.png', carteira: 'Família', saldo: 'R$ 15.623,00', moneyTimeFlow: [{ data: '01/01/2021', hora: '23:23:23', valor: 'R$ 1.000,00' }, { data: '01/01/2021', hora: '10:10:10', valor: 'R$ 2.000,00' }, { data: '01/01/2021', hora: '10:10:09', valor: 'R$ 3.000,00' }] }
]

//id progressivo
let contaId = 0;
let moneyTimeId = 0;
let momentoId = 0;


function testGetContas() {

    const minhasContas = [];


    //construindo os objetos
    contas.forEach(ct => {
        //gerando os objetos Conta
        const novaConta = new Conta(ct.nome, ct.carteira, ct.logo)

        //novaConta.id = ++contaId;

        //gerando os objetos MoneyTime
        novaConta.moneyTimeFlow = populandoMoneyTimeFlow(ct.moneyTimeFlow, novaConta);


        //console.log("ContaID:" + contaId);

        //atribuindo os logos para exibição
        //novaConta.logo = atribuindoLogos(novaConta.nome);
        novaConta.opcoesDeExibicao = {};//assim eu posso adicionar quantos atributos eu quiser aqui!!! 
        //e ele acessar diretamente com a notação de ponto.

        //pego o do último, mas na verdade deveria pegar o do mais recente pela data
        // já fiz o método que ordena, então já posso implementar isso
        novaConta.setSaldoPelosRegistros();

        minhasContas.push(novaConta);
    });

    console.log(minhasContas);

    return minhasContas;

}

function ordenaMoneyTimes(mtf) {
    mtf.sort(sortFunctionMoneyTimesPorDataEHora)
}

function populandoMoneyTimeFlow(mtf, conta) {

    const mtfArray = [];

    mtf.forEach(mt => {

        const momento = new Momento(mt.data, mt.hora)
        //momento.id = ++momentoId;
        //console.log('MomentoId: ' + momentoId);

        const moneyTime = new MoneyTime(conta.id, mt.valor, momento);
        //moneyTime.id = ++moneyTimeId;
        //console.log('moneyTimeId: ' + moneyTimeId);


        mtfArray.push(moneyTime);
    });

    //TODO >>> CHAMAR ORDENAÇÃO
    //A ORDENAÇÃO TERÁ DE DER DUPLA: EXTERNAMENTE PELA DATA E INTERNAMENTE PELO HORÁRIO

    ordenaMoneyTimes(mtfArray);

    return mtfArray;

}


