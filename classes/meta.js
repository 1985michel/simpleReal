"use strict";



/*
 
Quero TRÊS tipos de metas: VALOR, PRAZO, POR VALOR E PRAZO
 
>>> POR VALOR: DESCUBRO O TEMPO vou levar para atingir o valor X: 
preciso saber:
a) valor inicial
b) valor final a ser alcançado
c) periodicidade dos depósitos
d) valor dos depósticos

>>> POR PRAZO: DESCUBRO O MONTANTE FINAL depois de X prazo:
preciso saber:
a) valor inicial
b) valor dos depósitos
c) periodicidade dos depósitos
d) prazo

>>> POR VALOR E PRAZO: DESCUBRO O VALOR DOS DEPÓSITOS
preciso saber:
a) valor inicial
b) valor final a ser alcançado
c) periodicidade dos depósitos
d) prazo


*/

class Meta {
    constructor(valorInicial, valorASerAlcancado, valorDosDepositos, momentoInicial, deadLine, periodicidadeDepositos, valorAtual) {

        //valores
        this.valorInicial = valorInicial;//valor que havia quando a meta foi traçada
        this.valorASerAlcancado = valorASerAlcancado; //valor a ser atingido
        this.valorAtual = valorAtual; //valor atual (meio do processo)
        this.valorDosDepositos = valorDosDepositos; //nem sempre será informado

        //prazos e momentos
        this.momentoInicial = new Momento(momentoInicial.data, momentoInicial.hora);
        this.deadLine = new Momento(deadLine.data, deadLine.hora);
        this.periodicidadeDepositos = periodicidadeDepositos; //Periodicidade, está junto com a classe Recorrência

        this.qtdSteps = this.getQtdSteps()





    }

    getQtdSteps() {
        //SE A META FOR POR VALOR (DESCUBRO O TEMPO)
        if (this.valorDosDepositos > 0) {
            return (this.valorInicial - this.valorASerAlcancado) / this.valorDosDepositos;
        } else if (this.valorASerAlcancado == 0) {
            return
        }

    }

    getValorFinal() {
        //SE A META FOR POR PRAZO (DESCUBRO O MONTANTE FINAL)
        return this.valorInicial + (this.valorDosDepositos * this.qtdSteps);
    }

    getValorDepositos() {
        //se a meta for para alcançar um montante no prazo X, descobro o valor dos depósitos
        return (this.valorASerAlcancado - this.valorInicial) / this.qtdSteps;
    }
}


