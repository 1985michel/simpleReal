"use strict";


let idCompromissoPaiGlobal = 0;
let idCompromissoFilhoGlobal = 0;

class CompromissoPai {
    constructor(descricao, valor, vencimentoInicial, recorrencia, qtdParcelas) {

        this.id = ++idCompromissoPaiGlobal;
        this.descricao = descricao.slice();
        this.valor = valor;
        this.vencimentoInicial = new Momento(vencimentoInicial.data, vencimentoInicial.hora); //TODO conforme a periodicidade o compromisso deverá ser reprocessado a cada ciclo atribuindo o novo vencimento
        this.recorrencia = recorrencia;
        this.qtdParcelas = qtdParcelas;

        this.timeLine = [];
    }
}

class CompromissoFilho {
    constructor(idCompromissoPai, momentoVencimento) {
        this.id = ++idCompromissoFilhoGlobal;
        this.idCompromissoPai = idCompromissoPai;
        this.vencimento = momentoVencimento;
        this.isPago = false;
    }

}