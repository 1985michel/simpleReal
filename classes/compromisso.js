"use strict";

class Compromisso {
    constructor(descricao, valor, vencimento, recorrencia) {
        this.descricao = descricao.slice();
        this.valor = valor;
        this.vencimento = new Momento(vencimento.data, vencimento.hora); //TODO conforme a periodicidade o compromisso deverá ser reprocessado a cada ciclo atribuindo o novo vencimento
        this.recorrencia = recorrencia;
    }

    getDescricao() {
        return this.descricao.slice();
    }

    getValor() {
        return this.valor;
    }

    getVencimento() {
        return this.Vencimento;
    }

    getRecorrencia() {
        return this.recorrencia;
    }

    setDescricao(descricao) {
        this.descricao = descricao.slice();
    }

    setValor(valor) {
        this.valor = valor; //TODO validações
    }

    setVencimento(vencimento) {
        this.vencimento = new Momento(vencimento.data, vencimento.hora);
    }

    setRecorrencia(recorrencia) {
        this.recorrencia = new recorrencia(recorrencia); //TDOD tratar depois da criacao da Classe Recorrência
    }


}