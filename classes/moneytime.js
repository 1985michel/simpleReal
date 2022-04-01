"use strict";

class MoneyTime {
    constructor(saldo, momento) {

        this.id = 0;

        this.saldo = saldo; //saldo é um float
        this.momento = new Momento(momento.data, momento.hora);//para garantir clone interno evitando alterações imprevistas

        //ID
    }

    getSaldo() {
        return this.saldo; //float
    }

    getMomento() {
        return this.momento;
    }

    setSaldo(saldo) {
        this.saldo = saldo;

        //TODO - sempre que a atualização do saldo for positiva (para cima) o sistema deverá perguntar se a entrada já registrada
        //      caso o usuário responda que não, o sistema deverá abrir uma janela para registro da entrada.
    }

    setMomento(momento) {
        this.momento = new Momento(momento.data, momento.hora);//para garantir clone interno evitando alterações imprevistas
        //não há razão para alterar nada no momento. Editou? Crie um novo.
    }




}