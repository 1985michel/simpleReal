"use strict";





let idCompromissoPaiGlobal = 0;
let idCompromissoFilhoGlobal = 0;

class CompromissoPai {
    constructor(descricao, valor, vencimentoInicial, recorrencia, qtdParcelas, isfaturadonocartao) {

        this.id = ++idCompromissoPaiGlobal;
        this.descricao = descricao.slice();
        this.valor = valor;
        /* this.vencimentoInicial = new Momento(vencimentoInicial, ''); */ //TODO conforme a periodicidade o compromisso deverá ser reprocessado a cada ciclo atribuindo o novo vencimento
        this.vencimentoInicial = vencimentoInicial;
        this.recorrencia = recorrencia;
        this.qtdParcelas = qtdParcelas;
        this.qtdParcelasFuturas = 0;
        this.isfaturadonocartao = isfaturadonocartao;//essa variável é importante para que a dívida não seja contada duas vezes: na fatura do cartão e também como dívida em aberto;


        this.datasFuturas = [];
        this.timeLine = [];


        this.calculaQuantidadeDeParcelasFuturas();



    }





    calculaQuantidadeDeParcelasFuturas() {

        //primeiro limpamos o array
        this.datasFuturas = [];

        const comparandoPrimeiroVencimentoComADataAtual = isDataABeforDataB(getDataAtualFormatada(), this.vencimentoInicial);

        //console.log(`A COMPARACAO COM A DATA ATUAL DEU ${comparandoPrimeiroVencimentoComADataAtual}`);


        /* if (comparandoPrimeiroVencimentoComADataAtual != false) {
            //se entrou, as datas são iguais ou a primeira parcela vence no futuro, vou contar todas as parcelas

            console.log(`MESMA DATA OU ANTERIOR`);

            this.qtdParcelasFuturas = this.qtdParcelas;

        } else { */
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
                    //console.log(`Parcela 1: ${this.vencimentoInicial}`);
                    if (comparandoPrimeiroVencimentoComADataAtual != false) {
                        //se entrou, as datas são iguais ou a primeira parcela vence no futuro, vou contar todas as parcelas
                        this.datasFuturas.push(this.vencimentoInicial);
                        qtdPacFut++;
                    }
                    proxima = addDias(this.vencimentoInicial, this.recorrencia);
                    //console.log(`Parcela ${index + 1}: ${proxima}`);
                } else {
                    proxima = addDias(proxima, this.recorrencia);
                    // console.log(`Parcela ${index + 1}: ${proxima}`);
                }
                //console.log(`A data ${proxima} vamos acrescentar ${this.recorrencia} dias.`);

                //console.log(`O resultado foi ${proxima}`);
                const compara = isDataABeforDataB(hoje, proxima);
                if (compara != false) {
                    //parcelas que vencem hoje são consideradas parcelas futuras
                    /* console.log(` DAY A proxima parcela analisada vence em ${proxima} e por isso foi considerada futura.`); */
                    this.datasFuturas.push(proxima);
                    qtdPacFut++;
                } else {
                    qtdParPassadas++;
                }
            }
        } else if (this.recorrencia == 30 || this.recorrencia == '30') {
            for (let index = 1; index < this.qtdParcelas; index++) {

                if (index == 1) {
                    //console.log(`Parcela 1: ${this.vencimentoInicial}`);
                    if (comparandoPrimeiroVencimentoComADataAtual != false) {
                        //se entrou, as datas são iguais ou a primeira parcela vence no futuro, vou contar todas as parcelas
                        this.datasFuturas.push(this.vencimentoInicial);
                        qtdPacFut++;
                    }
                    proxima = addMeses(this.vencimentoInicial, 1);
                    //console.log(`Parcela ${index + 1}: ${proxima}`);
                } else {
                    proxima = addMeses(proxima, 1);
                    // console.log(`Parcela ${index + 1}: ${proxima}`);
                }
                //console.log(`A data ${proxima} vamos acrescentar ${this.recorrencia} dias.`);

                //console.log(`O resultado foi ${proxima}`);
                const compara = isDataABeforDataB(hoje, proxima);
                if (compara != false) {
                    //parcelas que vencem hoje são consideradas parcelas futuras
                    /* console.log(` DAY A proxima parcela analisada vence em ${proxima} e por isso foi considerada futura.`); */
                    this.datasFuturas.push(proxima);
                    qtdPacFut++;
                } else {
                    qtdParPassadas++;
                }
            }
        } else {
            //console.log(`Nao entramos, a recorrencia analisada foi ${this.recorrencia}`);
        }

        //console.log(`Ainda faltam: ${qtdPacFut}`);

        this.qtdParcelasFuturas = qtdPacFut;

        this.geraCompromissosMensais();
        //}
    }

    geraCompromissosMensais() {

        let newComps = [];

        for (let index = 0; index < this.datasFuturas.length; index++) {
            const dt = this.datasFuturas[index];

            const novoCompFilho = new CompromissoFilho(this, dt);

            newComps.push(novoCompFilho);

        }

        //quando é na criação do compromisso pai, tudo bem.
        //mas e quando é na edição? 
        // se eu gerar novos, vai ficar em duplicidade
        // se eu apagar a timeline antes de incluir, vai apagar os passados.
        // o melhor parece ser apagar os futuros (gerando novos), mas manter os passados.

        //como identificar os compromissos mensais?
        //não pode ser id, pq não estou alterando, estou gerando novos
        //não pode ser por data, pois talvez só se alterou a data de vencimento e por isso os outros se alteraram
        //não pode ser por valor

        //vou fazer o seguinte: vou correr a time line e vou excluir os compromisso futuros, deixando somente os passados.

        //dias depois percebi que se edito compromissos futuros que já foram pagos desmarca o "ispago" e ainda edita o valor já pago
        //compromissos já pagos não devem ser alterados também.

        const tamanhoOriginal = this.timeLine.length;

        for (let index = 0; index < tamanhoOriginal; index++) {

            if (index >= this.timeLine.length) {
                break;//sai do for
            }

            const comp = this.timeLine[index];

            const hoje = getDataAtualFormatada();
            const venc = this.timeLine[index].vencimento;
            const comparaDatas = isDataABeforDataB(hoje, venc);

            //&& !this.timeLine[index].ispago
            if (comparaDatas != false && !this.timeLine[index].ispago) {
                //se entrou é pq ou é data futura ou hoje,
                //e não foi pago, pq não alteramos compromissos já pagos. 

                /* this.timeLine[index].descricao = `${this.timeLine[index].descricao} [houve edição do compromisso recorrente após o pagamento desta parcela.]`; */

                this.timeLine.splice(index, 1);
                index--;//volta o indice uma casa               

            }
        }

        for (let index = 0; index < newComps.length; index++) {
            const nc = newComps[index];

            this.timeLine.push(nc);

            /* let mesmoCiclo = false;

            for (let f = 0; f < this.timeLine.length; f++) {
                const ac = this.timeLine[f];

                if (this.recorrencia == 30 && ac.vencimento[2, 10] == nc.vencimento[2, 10]) {
                    alert(`Mesmo ciclo: ${ac.vencimento[2, 10]} e ${nc.vencimento[2, 10]}`)
                    mesmoCiclo = true;
                }


            } */

            /*  if (!mesmoCiclo) this.timeLine.push(nc); */

        }

    }


}









class CompromissoFilho {
    constructor(compromissoPai, vencimento) {

        //nem todo compromisso filho tem compromisso pai, pode ser um compromisso único
        this.idCompromissoPai = compromissoPai.id;
        this.id = ++idCompromissoFilhoGlobal;
        this.isfaturadonocartao = compromissoPai.isfaturadonocartao; //importa para não somar duas vezes nas dívidas
        this.descricao = compromissoPai.descricao;
        this.valor = compromissoPai.valor;
        this.vencimento = vencimento;
        this.isPago = false;
    }



}

class CompromissoAvulso {

    constructor(descricao, valor, vencimento, isfaturadonocartao) {
        //vou usar o mesmo id do compromisso filho pois um vai extender o outro futuramente
        this.id = ++idCompromissoFilhoGlobal;
        this.descricao = descricao;
        this.valor = valor;
        this.vencimento = vencimento;
        this.ispago = false;
        this.isfaturadonocartao = isfaturadonocartao
    }



}