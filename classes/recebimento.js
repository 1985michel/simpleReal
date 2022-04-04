"use strict";

let idRecebimentoGlobal = 0;


class Recebimento {
    constructor(isRendaPassiva, ativoResponsavel, descricao, valor, contaDeRecebimento, dataRecebimento) {

        this.id = ++idRecebimentoGlobal;


        this.descricao = descricao;
        this.isrendapassiva = isRendaPassiva;
        this.ativoResponsavel = ativoResponsavel;
        this.origem = descricao;
        this.valor = valor;
        this.contaDeRecebimento = contaDeRecebimento;
        this.dataRecebimento = dataRecebimento;

    }
}