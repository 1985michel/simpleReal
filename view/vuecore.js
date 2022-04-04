


//variaveis globais apenas para uso com extracao e injecao de DB.
let contasArray = [];
let compromissosArray = [];
let compromissosDoMesArray = [];


const vm = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: vm => ({
        alignments: [
            'start',
            'center',
            'end',
        ],
        contas: getContasTratadas(),
        expandContas: false,

        saldo: '',

        editedIndex: -1,
        editedCountIndex: -1,
        editMt: {},

        carteiras: [],

        dialog: false,
        dialogDelete: false,

        dialogTitle: '',

        editedItem: {
            saldo: '',
            data: '',
            hora: '',
        },
        defaultItem: {
            saldo: '',
            data: '',
            hora: '',
        },

        //adicão de conta
        showAdicionarConta: false,
        nomeContaAdd: '',
        logoContaAdd: { nome: 'Banco do Brasil', img: '../imgs/logo-bb.png' },
        logoConfirmadoContaAdd: '../imgs/branco.png',
        carteiraContaAdd: '',
        dialogLogo: false,
        logos: getLogos(),



        //variaveis do pick date
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
        menu1: false,
        menu2: false,

        //variaveis de hora
        hora: '',











        //COMPROMISSOS

        dialogCompromissos: false,
        dialogDeleteCompromissos: false,
        headersCompromissos: [
            {
                text: 'Descrição',
                align: 'start',
                sortable: false,
                value: 'descricao',
            },
            { text: 'Valor', value: 'valor' },
            { text: 'Vencimento Inicial', value: 'vencimentoInicial' },
            { text: 'Recorrência', value: 'recorrencia' },
            { text: 'Qtd. Parcelas', value: 'qtdParcelas' },
            { text: 'Parc. Fut.', value: 'qtdParcelasFuturas' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        compromissos: testeGetCompromissos(),
        editedIndexCompromissos: -1,
        editedItemCompromissos: {
            descricao: '',
            valor: 0,
            vencimentoInicial: 0,
            recorrencia: 0,
            qtdParcelas: 0,
            qtdParcelasFuturas: 0,
        },
        defaultItemCompromissos: {
            descricao: '',
            valor: 0,
            vencimentoInicial: 0,
            recorrencia: 0,
            qtdParcelas: 0,
            qtdParcelasFuturas: 0,
        },
        expandCompromissosRecorrentes: false,








        /* compromissosDoMes */


        dialogCompromissosDoMes: false,
        dialogDeleteCompromissosDoMes: false,
        headersCompromissosDoMes: [
            {
                text: 'Descrição',
                align: 'start',
                sortable: false,
                value: 'descricao',
            },
            { text: 'Valor', value: 'valor' },
            { text: 'Vencimento', value: 'vencimento' },
            { text: 'Pago?', value: 'isPago' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        compromissosDoMes: testeGetCompromissosDoMes(),
        editedIndexCompromissosDoMes: -1,
        editedItemCompromissosDoMes: {
            descricao: '',
            valor: 0,
            vencimento: 0,
            isPago: 0,
        },
        defaultItemCompromissosDoMes: {
            descricao: '',
            valor: 0,
            vencimento: 0,
            isPago: 0,
        },
        expandCompromissosDoMes: false,




        /* dados estatísticos */
        resultados: {
            valorEmCaixa: 0,
            dividasTotais: 0,
            patrimonioReal: 0,
            compromissosNoMes: 0,
            resultadoParcialDoMes: 0,
            resultadoPrevistoParaOMes: 0,
        },


















        //Recebimentos

        //constructor(isRendaPassiva, ativoResponsavel, descricao, valor, contaDeRecebimento, dataRecebimento) 

        dialogRecebimentos: false,
        dialogDeleteRecebimentos: false,
        headersRecebimentos: [
            {
                text: 'Descrição',
                align: 'start',
                sortable: false,
                value: 'descricao',
            },
            { text: 'Ativo Responsável', value: 'ativoResponsavel' },
            { text: 'Renda Passiva?', value: 'isrendapassiva' },
            { text: 'Valor', value: 'valor' },
            { text: 'Conta de Recebimento', value: 'contaDeRecebimento' },
            { text: 'Data de Recebimento', value: 'dataRecebimento' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        recebimentos: testeGetRecebimentos(),
        editedIndexRecebimentos: -1,
        editedItemRecebimentos: {
            descricao: '',
            isrendapassiva: false,
            ativoResponsavel: 0,
            valor: 0,
            contaDeRecebimento: 0,
            dataRecebimento: 0,
        },
        defaultItemRecebimentos: {
            descricao: '',
            isrendapassiva: false,
            ativoResponsavel: 0,
            valor: 0,
            contaDeRecebimento: 0,
            dataRecebimento: 0,
        },
        expandRecebimentos: false,




    }),
    computed: {
        //metodos do pick date
        computedDateFormatted() {
            return this.formatDate(this.date)
        },

        /* carteiras() {
            //this.carteiras = [];
            const carteiras = [];

            for (const c in this.contas) {
                if (!this.carteiras.includes(c.carteira)) {
                    carteiras.push(c.carteira);
                }
            }

            return carteiras;
        }, */











        //COMPROMISSOS

        formTitleCompromissos() {
            return this.editedIndexCompromissos === -1 ? 'Novo Compromisso' : 'Editar Compromisso'
        },







        //COMPROMISSOS DO MES

        formTitleCompromissosDoMes() {
            return this.editedIndexCompromissosDoMes === -1 ? 'Novo Compromisso' : 'Editar Compromisso'
        },






        //RECEBIMENTOS

        formTitleRecebimentos() {
            return this.editedIndexRecebimentos === -1 ? 'Novo Recebimento' : 'Editar Recebimento'
        },

    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
        //metodos do pick date

        date(val) {
            this.dateFormatted = this.formatDate(this.date)
        },

        hora() {
            this.editedItem.hora = this.hora;
        },














        //COMPROMISSOS
        dialogCompromissos(val) {
            val || this.close()
        },
        dialogDeleteCompromissos(val) {
            val || this.closeDelete()
        },





        //COMPROMISSOS DO MES
        dialogCompromissosDoMes(val) {
            val || this.close()
        },
        dialogDeleteCompromissosDoMes(val) {
            val || this.closeDelete()
        },






        //Recebimentos
        dialogRecebimentos(val) {
            val || this.close()
        },
        dialogDeleteRecebimentos(val) {
            val || this.closeDelete()
        },

    },
    created() {
        /* aqui você pode chamar os métodos que quer que sejam executados antes de inicializar os componenetes */
        this.updateCarteiras();
        this.getResultados();
    },

    methods: {

        updateCarteiras() {

            this.carteiras = [];

            for (let index = 0; index < this.contas.length; index++) {
                const c = this.contas[index];
                if (!this.carteiras.includes(c.carteira)) {
                    this.carteiras.push(c.carteira);
                }
            }

        },

        adcionarConta() {

            const novaConta = new Conta(this.nomeContaAdd, this.carteiraContaAdd);

            novaConta.opcoesDeExibicao = {};
            novaConta.opcoesDeExibicao.showHistory = false;
            novaConta.opcoesDeExibicao.showDetalhes = false;

            novaConta.logo = this.logoConfirmadoContaAdd;
            this.contas.unshift(novaConta);

            //limpando os campos de adição de nova conta
            this.cleanAdcionarContaFields();

            //atualizando as carteiras pois pode ter sido criada uma nova
            //this.updateCarteiras();

        },

        cleanAdcionarContaFields() {
            this.nomeContaAdd = '';
            this.logoContaAdd = { nome: 'Banco do Brasil', img: '../imgs/logo-bb.png' };
            this.logoConfirmadoContaAdd = '../imgs/branco.png';
            this.carteiraContaAdd = '';

            this.showAdicionarConta = false;
        },

        novoSaldo(contaId) {
            this.dialogTitle = "Novo Saldo";
            this.editedCountIndex = contaId;
            this.hora = this.getHoraAtual();
            //console.log(this.editItem.hora);
            this.dialog = true;
        },

        editItem(contaId, id) {
            this.dialogTitle = "Editar ";

            //this.editedIndex = this.contas.indexOf(item)
            //this.editedItem = Object.assign({}, item)

            this.editedCountIndex = contaId;
            this.editedIndex = id;

            const ct = this.getContaById(this.editedCountIndex);
            const mt = ct.getMoneyTimeById(id)

            this.editMt = mt;

            //alimentando o formulário
            this.saldo = mt.saldo;
            this.hora = mt.momento.hora;
            this.date = this.parseDate(mt.momento.data);

            this.dialog = true
        },

        deleteItem(contaId, id) {
            this.dialogTitle = "Delete";
            //this.editedIndex = this.getContaById(contaId).moneyTimeFlow.indexOf(item)
            //this.editedItem = Object.assign({}, item)
            /* console.log("Queremos deletar o mt de id: " + id);
            this.getContaById(contaId).deleteMoneyTimeById(this.editItem.id); */

            this.editedCountIndex = contaId;


            //console.log(`Vamos trabalhar o id: ${id}`);
            this.editedIndex = id;
            //console.log(`Vamos trabalhar o id: ${this.editedIndex}`);

            //console.log("Queremos delete o mt de id: " + this.editItem.id);
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            //this.contas.splice(this.editedIndex, 1)
            this.getContaById(this.editedCountIndex).deleteMoneyTimeById(this.editedIndex);

            //const conta = this.getContaById(this.editedCountIndex);

            //console.log(`Queremos deletar a conta de id ${this.editedCountIndex} cujo nome é ${conta.nome}`);
            //console.log(`Queremos deletar a mt de id ${this.editedIndex} cujo valor é ${this.editedIndex.saldo}`);

            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                //Object.assign(this.contas[this.editedIndex], this.editedItem)


                this.editMt.saldo = this.saldo;
                this.editMt.momento.data = this.formatDate(this.date);
                this.editMt.momento.hora = this.hora


                this.reprocessaDadosDaConta(this.getContaById(this.editedCountIndex));

            } else {
                //const saldo = this.editedItem.saldo;
                /* const data = this.editedItem.data; */
                const data = this.formatDate(this.date);
                //const hora = this.editedItem.hora;
                console.log(`Saldo: ${this.saldo} Data: ${data} Hora: ${this.hora}`);

                const momento = new Momento(data, this.hora);
                const moneyTime = new MoneyTime(this.editedCountIndex, this.saldo, momento);

                //this.contas[this.editedCountIndex - 1].addMoneyTime(moneyTime);

                const cont = this.getContaById(this.editedCountIndex);
                cont.addMoneyTime(moneyTime);

                //cont.cLPrint();

                this.reprocessaDadosDaConta(this.getContaById(this.editedCountIndex));
                this.cleanNewSaldoModal();
            }
            this.close()
        },

        cleanNewSaldoModal() {
            this.saldo = 'R$ 0,00';
        },
        //metodos do pick date
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate(date) {
            if (!date) return null

            const [day, month, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },


        //metodos de horário
        getHoraAtual() {
            const data = new Date();
            const hora = data.getHours();          // 0-23
            const min = data.getMinutes();        // 0-59
            const seg = data.getSeconds();        // 0-59


            return hora + ':' + min + ':' + seg;
        },

        reprocessaDadosDaConta(conta) {

            //conta.cLPrint();
            conta.setSaldoPelosRegistros();//esse tem que vir primeiro porque ordena
            this.getCoresDoHistorico(conta);


        },

        getCoresDoHistorico(conta) {

            let valorAnterior = '';

            conta.ordenarRegistrosPorMomento();

            conta.moneyTimeFlow.forEach(mt => {
                if (valorAnterior == '') {
                    valorAnterior = mt.saldo;
                    console.log(`Primeiro setamos o valorAnterior para ${valorAnterior}`);
                } else if (fromRealtoNumber(valorAnterior) > fromRealtoNumber(mt.saldo)) {
                    console.log(`Como ${fromRealtoNumber(valorAnterior)} > ${fromRealtoNumber(mt.saldo)} : RED`);
                    valorAnterior = mt.saldo;
                    mt.cor = 'red';
                } else if (fromRealtoNumber(valorAnterior) < fromRealtoNumber(mt.saldo)) {
                    valorAnterior = mt.saldo;
                    mt.cor = 'green';
                    console.log(`Como ${fromRealtoNumber(valorAnterior)} < ${fromRealtoNumber(mt.saldo)} : GREEN`);
                } else if (fromRealtoNumber(valorAnterior) == fromRealtoNumber(mt.saldo)) {
                    valorAnterior = mt.saldo;
                    console.log(`Como ${fromRealtoNumber(valorAnterior)} == ${fromRealtoNumber(mt.saldo)} : BLUE`);
                    mt.cor = 'blue';
                }


            });
        },

        getContaById(idConta) {


            for (let index = 0; index < this.contas.length; index++) {
                const c = this.contas[index];
                if (c.id == idConta) {
                    //console.log("Achamos a conta de nome: " + c.nome);
                    c.cLPrint();
                    return c;
                }

            }
        },








        //COMPROMISSOS
        editItemCompromissos(item) {
            this.editedIndexCompromissos = this.compromissos.indexOf(item)
            this.editedItemCompromissos = Object.assign({}, item)
            this.dialogCompromissos = true
        },

        deleteItemCompromissos(item) {
            this.editedIndexCompromissos = this.compromissos.indexOf(item)
            this.editedItemCompromissos = Object.assign({}, item)
            this.dialogDeleteCompromissos = true
        },

        deleteItemConfirmCompromissos() {
            this.compromissos.splice(this.editedIndexCompromissos, 1)
            this.closeDeleteCompromissos()
        },

        closeCompromissos() {
            this.dialogCompromissos = false
            this.$nextTick(() => {
                this.editedItemCompromissos = Object.assign({}, this.defaultItemCompromissos)
                this.editedIndexCompromissos = -1
            })
        },

        closeDeleteCompromissos() {
            this.dialogDeleteCompromissos = false
            this.$nextTick(() => {
                this.editedItemCompromissos = Object.assign({}, this.defaultItemCompromissos)
                this.editedIndexCompromissos = -1
            })
        },

        saveCompromissos() {
            if (this.editedIndexCompromissos > -1) {
                Object.assign(this.compromissos[this.editedIndexCompromissos], this.editedItemCompromissos)
            } else {
                const novoComp = new CompromissoPai(this.editedItemCompromissos.descricao, this.editedItemCompromissos.valor, this.editedItemCompromissos.vencimentoInicial, this.editedItemCompromissos.recorrencia, this.editedItemCompromissos.qtdParcelas, this.editedItemCompromissos.qtdParcelasFuturas);

                this.compromissos.push(novoComp);
            }
            this.closeCompromissos()
        },











        //COMPROMISSOS
        editItemCompromissosDoMes(item) {
            this.editedIndexCompromissosDoMes = this.compromissosDoMes.indexOf(item)
            this.editedItemCompromissosDoMes = Object.assign({}, item)
            this.dialogCompromissosDoMes = true
        },

        deleteItemCompromissosDoMes(item) {
            this.editedIndexCompromissosDoMes = this.compromissosDoMes.indexOf(item)
            this.editedItemCompromissosDoMes = Object.assign({}, item)
            this.dialogDeleteCompromissosDoMes = true
        },

        deleteItemConfirmCompromissosDoMes() {
            this.compromissosDoMes.splice(this.editedIndexCompromissosDoMes, 1)
            this.closeDeleteCompromissosDoMes()
        },

        closeCompromissosDoMes() {
            this.dialogCompromissosDoMes = false
            this.$nextTick(() => {
                this.editedItemCompromissosDoMes = Object.assign({}, this.defaultItemCompromissosDoMes)
                this.editedIndexCompromissosDoMes = -1
            })
        },

        closeDeleteCompromissosDoMes() {
            this.dialogDeleteCompromissosDoMes = false
            this.$nextTick(() => {
                this.editedItemCompromissosDoMes = Object.assign({}, this.defaultItemCompromissosDoMes)
                this.editedIndexCompromissosDoMes = -1
            })
        },

        saveCompromissosDoMes() {
            if (this.editedIndexCompromissosDoMes > -1) {
                Object.assign(this.compromissosDoMes[this.editedIndexCompromissosDoMes], this.editedItemCompromissosDoMes)
            } else {
                const novoComp = new CompromissoAvulso(this.editedItemCompromissosDoMes.descricao, this.editedItemCompromissosDoMes.valor, this.editedItemCompromissosDoMes.vencimento);

                novoComp.isPago = this.editedItemCompromissosDoMes.isPago;

                this.compromissosDoMes.push(novoComp);
            }
            this.closeCompromissosDoMes()
        },





















        //Recebimento
        editItemRecebimentos(item) {
            this.editedIndexRecebimentos = this.recebimentos.indexOf(item)
            this.editedItemRecebimentos = Object.assign({}, item)
            this.dialogRecebimentos = true
        },

        deleteItemRecebimentos(item) {
            this.editedIndexRecebimentos = this.recebimentos.indexOf(item)
            this.editedItemRecebimentos = Object.assign({}, item)
            this.dialogDeleteRecebimentos = true
        },

        deleteItemConfirmRecebimentos() {
            this.recebimentos.splice(this.editedIndexRecebimentos, 1)
            this.closeDeleteRecebimentos()
        },

        closeRecebimentos() {
            this.dialogRecebimentos = false
            this.$nextTick(() => {
                this.editedItemRecebimentos = Object.assign({}, this.defaultItemRecebimentos)
                this.editedIndexRecebimentos = -1
            })
        },

        closeDeleteRecebimentos() {
            this.dialogDeleteRecebimentos = false
            this.$nextTick(() => {
                this.editedItemRecebimentos = Object.assign({}, this.defaultItemRecebimentos)
                this.editedIndexRecebimentos = -1
            })
        },

        saveRecebimentos() {
            if (this.editedIndexRecebimentos > -1) {
                Object.assign(this.recebimentos[this.editedIndexRecebimentos], this.editedItemRecebimentos)
            } else {
                //isRendaPassiva, ativoResponsavel, descricao, valor, contaDeRecebimento, dataRecebimento
                const novoRec = new Recebimento(this.editedItemRecebimentos.isrendapassiva, this.editedItemRecebimentos.ativoResponsavel, this.editedItemRecebimentos.descricao, this.editedItemRecebimentos.valor, this.editedItemRecebimentos.contaDeRecebimento, this.editedItemRecebimentos.dataRecebimento);

                this.recebimentos.push(novoRec);
            }
            this.closeRecebimentos()
        },












        //funções estatísticas

        /* resultados: {
            valorEmCaixa: 0,
            dividasTotais: 0,
            patrimonioReal: 0,
            compromissosNoMes: 0,
            resultadoParcialDoMes: 0,
            resultadoPrevistoParaOMes: 0, */

        getResultados() {

            this.getTotalEmCaixa();

        },

        getTotalEmCaixa() {

            let totalPositivo = 0;
            let totalNegativo = 0;

            for (let index = 0; index < this.contas.length; index++) {
                const c = this.contas[index];

                const valorNumerico = fromRealtoNumber(c.saldo)

                if (valorNumerico > 0) {
                    totalPositivo += valorNumerico;
                } else {
                    //se a conta estiver negativa
                    totalNegativo += valorNumerico;

                }

            }

            this.resultados.valorEmCaixa = fromNumberToReal(totalPositivo);
            this.resultados.dividasTotais = fromNumberToReal(totalNegativo);
            this.resultados.patrimonioReal = fromNumberToReal(totalNegativo + totalPositivo);
        },










        /* métodos de extração e injeção de JSON */


        extracao() {
            ativaStringfyInOut(this.contas, this.compromissos, this.compromissosDoMes);
        },

        injetaFromJson() {
            this.contas = contasArray;
            this.compromissos = compromissosArray;
            this.compromissosDoMes = compromissosDoMesArray;

            //daí atualizamos os dados estatísticos;
            this.getResultados();
        }




    }
})