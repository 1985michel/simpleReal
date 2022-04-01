"use strict";

class Conta {
    constructor(nome, carteira) {

        this.id = 0;

        this.nome = nome;
        this.carteira = carteira;//A priore carteira será apenas uma string
        this.moneyTimeFlow = [];

        //ID
    }

    getNome() {
        return this.nome.slice();
    }

    getCarteira() {
        return this.carteira.slice();
    }

    addMoneyTime(moneyTime) {
        this.moneyTimeFlow.push(moneyTime);
    }

    setNome(nome) {
        this.nome = nome;
    }

    setCarteira(carteira) {
        this.carteira = carteira;
    }

    setMoneyTime(moneyTime) {
        //TODO
    }

    deleteMoneyTime(moneyTime) {
        //TODO
    }
}