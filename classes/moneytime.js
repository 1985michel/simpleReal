"use strict";

let idMoneyTimeGlobal = 0;

class MoneyTime {
    constructor(idConta, saldo, momento) {

        this.id = ++idMoneyTimeGlobal;//sempre zero, setado depois

        this.contaId = idConta;

        this.saldo = saldo; //saldo é um float

        momento.moneyTimeId = this.id;
        this.momento = momento;
        //this.momento = new Momento(this.id, momento.data.slice(), momento.hora.slice());//para garantir clone interno evitando alterações imprevistas

        //this.momento.id = momento.id;
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
        this.momento = new Momento(this.id, momento.data, momento.hora);//para garantir clone interno evitando alterações imprevistas
        //não há razão para alterar nada no momento. Editou? Crie um novo.
    }




}