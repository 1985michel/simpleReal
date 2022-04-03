"use strict";

class Conta {
    constructor(nome, carteira) {

        this.id = 0;

        this.nome = nome;
        this.carteira = carteira;//A priore carteira será apenas uma string
        this.moneyTimeFlow = [];

        this.saldo = '';//a conta não tem saldo quando é criada. Ele é setado dinamicamente.

        //ID
    }

    cLPrint() {
        console.log(`id: ${this.id}`);
        console.log(`nome: ${this.nome}`);
        console.log(`saldo: ${this.saldo}`);
        console.log(`MoneyTimeFlow: ${this.moneyTimeFlow.length}`);

    }

    getNome() {
        return this.nome.slice();
    }

    getCarteira() {
        return this.carteira.slice();
    }

    addMoneyTime(moneyTime) {

        /* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SÓ PARA O AMBIENTE DE TESTES INICIAIS */
        if (moneyTime.id == 0 || moneyTime.id == '0') {
            moneyTime.id = this.id * 10 + this.moneyTimeFlow.length
        }
        this.moneyTimeFlow.unshift(moneyTime);
    }

    setNome(nome) {
        this.nome = nome;
    }

    setCarteira(carteira) {
        this.carteira = carteira;
    }


    deleteMoneyTimeById(moneyTimeId) {

        for (let index = 0; index < this.moneyTimeFlow.length; index++) {
            const mt = this.moneyTimeFlow[index];

            if (mt.id === moneyTimeId) {
                this.moneyTimeFlow.splice(index, 1);//remove the elemento in index position
            }

        }

        if (this.moneyTimeFlow.length == 0) {
            this.saldo = 'R$ 0,00'
        }

    }

    getMoneyTimeById(id) {
        for (let index = 0; index < this.moneyTimeFlow.length; index++) {
            const mt = this.moneyTimeFlow[index];

            if (mt.id === id) {
                return mt;
            }

        }
    }


    ordenarRegistrosPorMomento() {
        this.moneyTimeFlow.sort(sortFunctionMoneyTimesPorDataEHora);
    }

    setSaldoPelosRegistros() {
        this.ordenarRegistrosPorMomento();

        const ultimoRegistro = this.moneyTimeFlow[this.moneyTimeFlow.length - 1].saldo;
        console.log(">>>>>>>> o ultimo registro foi de " + ultimoRegistro);

        this.saldo = ultimoRegistro;

    }
}