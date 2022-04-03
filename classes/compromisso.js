"use strict";


let idCompromissoPaiGlobal = 0;
let idCompromissoFilhoGlobal = 0;

class CompromissoPai {
    constructor(descricao, valor, vencimentoInicial, recorrencia, qtdParcelas, qtdParcelasFuturas) {

        this.id = ++idCompromissoPaiGlobal;
        this.descricao = descricao.slice();
        this.valor = valor;
        /* this.vencimentoInicial = new Momento(vencimentoInicial, ''); */ //TODO conforme a periodicidade o compromisso deverá ser reprocessado a cada ciclo atribuindo o novo vencimento
        this.vencimentoInicial = vencimentoInicial;
        this.recorrencia = recorrencia;
        this.qtdParcelas = qtdParcelas;
        this.qtdParcelasFuturas = qtdParcelasFuturas;

        this.timeLine = [];
    }
}

class CompromissoFilho {
    constructor(compromissoPai, venciento) {

        //nem todo compromisso filho tem compromisso pai, pode ser um compromisso único
        this.idCompromissoPai = compromissoPai.id;
        this.id = ++idCompromissoFilhoGlobal;

        this.descricao = compromissoPai.descricao;
        this.valor = compromissoPai.valor;
        this.vencimento = venciento;
        this.isPago = false;
    }

}

class CompromissoAvulso {

    constructor(descricao, valor, vencimento) {
        //vou usar o mesmo id do compromisso filho pois um vai extender o outro futuramente
        this.id = ++idCompromissoFilhoGlobal;
        this.descricao = descricao;
        this.valor = valor;
        this.vencimento = vencimento;
        this.isPago = false;
    }

}