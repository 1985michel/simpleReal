

/* let contasArray = [];
let compromissosArray = [];
let compromissosDoMesArray = []; */


function arrayToString(arr) {

    let stringada = JSON.stringify(arr);
    //console.log(stringada);
    return stringada;
}



/* function ativaStringfyInOut(contas, compromissos, compromissosDoMes, recebimentos) {

    //se a caixa de texto estiver vazia
    if (document.querySelector("#txtarea2").value == "") {
        if (confirm("Gerar extração?")) {
            getStringfyOut(contas, compromissos, compromissosDoMes, recebimentos);
        }

    } else {
        if (confirm("Introduzir dados?")) {
            getStringfyIn()
        }
    }

} */
function prepararBackup(contas, compromissos, compromissosDoMes, recebimentos) {

    document.querySelector("#txtareabackup").value == ""

    if (confirm("Download Backup?")) {
        getStringfyOut(contas, compromissos, compromissosDoMes, recebimentos);
    }
}


function ativaDropIn() {

    this.dropValue = txtareabackup.value;

    if (confirm("Introduzir dados?")) {
        getStringfyInDrop(dropValue);
        vm.injetaFromJson();
    }


}

function getStringfyInDrop(dropValue) {
    //pega os dados de entrada

    //processaEntradaDeTodosOsDados(document.querySelector("#txtareabackup").value);
    processaEntradaDeTodosOsDados(dropValue);



    //limpa a caixa
    document.getElementById("txtareabackup").value = ""

}

function getStringfyIn() {
    //pega os dados de entrada

    processaEntradaDeTodosOsDados(document.querySelector("#txtareabackup").value);



    //limpa a caixa
    document.getElementById("txtareabackup").value = ""

}

function getStringfyOut(contas, compromissos, compromissosDoMes, recebimentos) {

    //limpa a caixa
    //document.getElementById("txtarea2").value = ""

    //gera os dados de saída
    document.getElementById("txtareabackup").value = stringfyAll(contas, compromissos, compromissosDoMes, recebimentos);
}


function stringfyAll(contas, compromissos, compromissosDoMes, recebimentos) {

    let txt = '{"contas":' + arrayToString(contas);

    // fazer o mesmo para provas
    //txt += ', "carteiras":' + arrayToString(this.carteiras);

    // fazer o mesmo para provas
    txt += ', "compromissos":' + arrayToString(compromissos);

    //dados básicos
    txt += ', "compromissosDoMes":' + arrayToString(compromissosDoMes);

    txt += ', "recebimentos":' + arrayToString(recebimentos);

    txt += '}';

    //console.log(`Saída: ${txt}`);

    return txt;
}

function processaEntradaDeTodosOsDados(entrada) {

    var obj = JSON.parse(entrada);


    toContas(obj.contas);
    /* toCarteiras(obj.carteiras);*/
    toCompromissos(obj.compromissos);
    toCompromissosDoMes(obj.compromissosDoMes);
    toRecebimentos(obj.recebimentos)


    //console.log(`Temos: ${contasArray.length} contas;   ${compromissosArray.length} compromissos; ${compromissosDoMesArray.length} compromissos do mes.`);



}

function toContas(contas) {
    contas.forEach(element => {
        //console.log(`element é um objeto que tem os seguintes atributos ${Object.keys(element)}`);
        getObjectConta(element);
    });
}

function toRecebimentos(recebimentos) {
    recebimentos.forEach(element => {
        //console.log(`element é um objeto que tem os seguintes atributos ${Object.keys(element)}`);
        getObjectRecebimento(element);
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
    conta.opcoesDeExibicao.showHistory = false;
    conta.opcoesDeExibicao.showDetalhes = false;

    contasArray.push(conta);

}

function getObjectCompromisso(el) {

    /* constructor(descricao, valor, vencimentoInicial, recorrencia, qtdParcelas, qtdParcelasFuturas) */

    const comp = new CompromissoPai(el.descricao, el.valor, el.vencimentoInicial, el.recorrencia, el.qtdParcelas, el.isfaturadonocartao);

    comp.qtdParcelasFuturas = el.qtdParcelasFuturas;

    comp.id = el.id;


    compromissosArray.push(comp);

}

function getObjectCompromissoDoMes(el) {

    /* descricao, valor, vencimento*/

    const comp = new CompromissoAvulso(el.descricao, el.valor, el.vencimento, el.isfaturadonocartao);
    comp.id = el.id;
    comp.ispago = el.ispago;


    compromissosDoMesArray.push(comp);

    //console.log(`Compromissos do Mes: ${compromissosDoMesArray.length}`);

}

function getObjectRecebimento(el) {

    /* constructor(descricao, valor, vencimentoInicial, recorrencia, qtdParcelas, qtdParcelasFuturas) */

    const rec = new Recebimento(el.isRendaPassiva, el.ativoResponsavel, el.descricao, el.valor, el.contaDeRecebimento, el.dataRecebimento);
    rec.id = el.id;


    recebimentosArray.push(rec);

}