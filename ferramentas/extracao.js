

/* let contasArray = [];
let compromissosArray = [];
let compromissosDoMesArray = []; */


function arrayToString(arr) {

    let stringada = JSON.stringify(arr);
    console.log(stringada);
    return stringada;
}

function ativaStringfyInOut(contas, compromissos, compromissosDoMes) {

    //se a caixa de texto estiver vazia
    if (document.querySelector("#txtarea2").value == "") {
        if (confirm("Gerar extração?")) {
            getStringfyOut(contas, compromissos, compromissosDoMes);
        }

    } else {
        if (confirm("Introduzir dados?")) {
            getStringfyIn()
        }
    }

}

function getStringfyIn() {
    //pega os dados de entrada

    processaEntradaDeTodosOsDados(document.querySelector("#txtarea2").value);



    //limpa a caixa
    document.getElementById("txtarea2").value = ""

}

function getStringfyOut(contas, compromissos, compromissosDoMes) {

    //limpa a caixa
    document.getElementById("txtarea2").value = ""

    //gera os dados de saída
    document.getElementById("txtarea2").value = stringfyAll(contas, compromissos, compromissosDoMes);
}


function stringfyAll(contas, compromissos, compromissosDoMes) {

    let txt = '{"contas":' + arrayToString(contas);

    // fazer o mesmo para provas
    //txt += ', "carteiras":' + arrayToString(this.carteiras);

    // fazer o mesmo para provas
    txt += ', "compromissos":' + arrayToString(compromissos);

    //dados básicos
    txt += ', "compromissosDoMes":' + arrayToString(compromissosDoMes);


    txt += '}';

    console.log(`Saída: ${txt}`);

    return txt;
}

function processaEntradaDeTodosOsDados(entrada) {

    var obj = JSON.parse(entrada);


    toContas(obj.contas);
    /* toCarteiras(obj.carteiras);*/
    toCompromissos(obj.compromissos);
    toCompromissosDoMes(obj.compromissosDoMes);


    console.log(`Temos: ${contasArray.length} contas;   ${compromissosArray.length} compromissos; ${compromissosDoMesArray.lenght} compromissos do mes.`);



}

function toContas(contas) {
    contas.forEach(element => {
        //console.log(`element é um objeto que tem os seguintes atributos ${Object.keys(element)}`);
        getObjectConta(element);
    });
}


function toCompromissos(compromissos) {
    compromissos.forEach(element => {
        //console.log(`element é um objeto que tem os seguintes atributos ${Object.keys(element)}`);
        getObjectCompromisso(element);
    });
}

function toCompromissosDoMes(compromissosDoMes) {
    compromissosDoMes.forEach(element => {
        //console.log(`element é um objeto que tem os seguintes atributos ${Object.keys(element)}`);
        getObjectCompromissoDoMes(element);
    });
}

function getObjectConta(el) {

    const conta = new Conta(el.nome, el.carteira, el.logo)

    conta.id = el.id;

    for (let index = 0; index < el.moneyTimeFlow.length; index++) {
        const mtpre = el.moneyTimeFlow[index];

        const momento = new Momento(mtpre.momento.data, mtpre.momento.hora);
        momento.id = mtpre.momento.id;
        momento.moneyTimeId = mtpre.momento.moneyTimeId;
        momento.cor = mtpre.momento.cor;

        const mt = new MoneyTime(conta.id, mtpre.saldo, momento);
        mt.id = mtpre.id;

        conta.moneyTimeFlow.push(mt);

    }

    conta.saldo = el.saldo;
    conta.opcoesDeExibicao = {};
    conta.opcoesDeExibicao.showHistory = el.opcoesDeExibicao.showHistory;
    conta.opcoesDeExibicao.showDetalhes = el.opcoesDeExibicao.showDetalhes;

    contasArray.push(conta);

}

function getObjectCompromisso(el) {

    /* constructor(descricao, valor, vencimentoInicial, recorrencia, qtdParcelas, qtdParcelasFuturas) */

    const comp = new CompromissoPai(el.descricao, el.valor, el.vencimentoInicial, el.recorrencia, el.qtdParcelas, el.qtdParcelasFuturas);
    comp.id = el.id;


    compromissosArray.push(comp);

}

function getObjectCompromissoDoMes(el) {

    /* descricao, valor, vencimento*/

    const comp = new CompromissoAvulso(el.descricao, el.valor, el.vencimento);
    comp.id = el.id;
    comp.isPago = el.isPago;


    compromissosDoMesArray.push(comp);

    console.log(`Compromissos do Mes: ${compromissosDoMesArray.length}`);

}