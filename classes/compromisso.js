"use strict";





let idCompromissoPaiGlobal = 0;
let idCompromissoFilhoGlobal = 0;

class CompromissoPai {
    constructor(descricao, valor, vencimentoInicial, recorrencia, qtdParcelas) {

        this.id = ++idCompromissoPaiGlobal;
        this.descricao = descricao.slice();
        this.valor = valor;
        /* this.vencimentoInicial = new Momento(vencimentoInicial, ''); */ //TODO conforme a periodicidade o compromisso deverá ser reprocessado a cada ciclo atribuindo o novo vencimento
        this.vencimentoInicial = vencimentoInicial;
        this.recorrencia = recorrencia;
        this.qtdParcelas = qtdParcelas;
        this.qtdParcelasFuturas = this.calculaQuantidadeDeParcelasFuturas();

        this.timeLine = [];
    }

    calculaQuantidadeDeParcelasFuturas() {

        const comparandoPrimeiroVencimentoComADataAtual = isDataABeforDataB(getDataAtualFormatada(), this.vencimentoInicial);

        console.log(`A COMPARACAO COM A DATA ATUAL DEU ${comparandoPrimeiroVencimentoComADataAtual}`);


        if (comparandoPrimeiroVencimentoComADataAtual != false) {
            //se entrou, as datas são iguais ou a primeira parcela vence no futuro, vou contar todas as parcelas

            console.log(`MESMA DATA OU ANTERIOR`);

            return this.qtdParcelas

        } else {
            //aqui é o caso de a primeira parcela ser em data passada
            let qtdPacFut = 0;
            let qtdParPassadas = 0;

            const hoje = getDataAtualFormatada();

            let proxima = '';

            if (this.recorrencia == 1 || this.recorrencia == 7) {

                //console.log(`Entramos a recorrencia deu ${this.recorrencia}`);

                //console.log(`O Vencimento inicial é ${this.vencimentoInicial}`);



                for (let index = 1; index < this.qtdParcelas; index++) {

                    if (index == 1) {
                        console.log(`Parcela 1: ${this.vencimentoInicial}`);
                        proxima = addDias(this.vencimentoInicial, this.recorrencia);
                        console.log(`Parcela ${index + 1}: ${proxima}`);
                    } else {
                        proxima = addDias(proxima, this.recorrencia);
                        console.log(`Parcela ${index + 1}: ${proxima}`);
                    }
                    //console.log(`A data ${proxima} vamos acrescentar ${this.recorrencia} dias.`);

                    //console.log(`O resultado foi ${proxima}`);
                    const compara = isDataABeforDataB(hoje, proxima);
                    if (compara != false) {
                        //parcelas que vencem hoje são consideradas parcelas futuras
                        /* console.log(` DAY A proxima parcela analisada vence em ${proxima} e por isso foi considerada futura.`); */
                        qtdPacFut++;
                    } else {
                        qtdParPassadas++;
                    }
                }
            } else if (this.recorrencia == 30 || this.recorrencia == '30') {
                for (let index = 1; index < this.qtdParcelas; index++) {

                    if (index == 1) {
                        console.log(`Parcela 1: ${this.vencimentoInicial}`);
                        proxima = addMeses(this.vencimentoInicial, 1);
                        console.log(`Parcela ${index + 1}: ${proxima}`);
                    } else {
                        proxima = addMeses(proxima, 1);
                        console.log(`Parcela ${index + 1}: ${proxima}`);
                    }
                    //console.log(`A data ${proxima} vamos acrescentar ${this.recorrencia} dias.`);

                    //console.log(`O resultado foi ${proxima}`);
                    const compara = isDataABeforDataB(hoje, proxima);
                    if (compara != false) {
                        //parcelas que vencem hoje são consideradas parcelas futuras
                        /* console.log(` DAY A proxima parcela analisada vence em ${proxima} e por isso foi considerada futura.`); */
                        qtdPacFut++;
                    } else {
                        qtdParPassadas++;
                    }
                }
            } else {
                console.log(`Nao entramos, a recorrencia analisada foi ${this.recorrencia}`);
            }

            return qtdPacFut;
        }
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
        this.ispago = false;
    }

}