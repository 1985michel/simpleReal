



//variaveis globais apenas para uso com extracao e injecao de DB.
let contasArray = [];
let compromissosArray = [];
let compromissosDoMesArray = [];
let recebimentosArray = []

const recorrencia = [

    { nome: 'Diária', diasPorCiclo: 1 },
    { nome: 'Semanal', diasPorCiclo: 7 },

    { nome: 'Mensal', diasPorCiclo: 30 },
    { nome: 'Anual', diasPorCiclo: 365 },

]

/* const competencias = [

    { nome: '01/2022', valor: '01/2022' },
    { nome: '02/2022', valor: '01/2022' },
    { nome: '03/2022', valor: '01/2022' },
    { nome: '04/2022', valor: '01/2022' },
    { nome: '05/2022', valor: '01/2022' },
    { nome: '06/2022', valor: '01/2022' },
    { nome: '07/2022', valor: '01/2022' },
    { nome: '08/2022', valor: '01/2022' },
    { nome: '09/2022', valor: '01/2022' },
    { nome: '10/2022', valor: '01/2022' },
    { nome: '11/2022', valor: '01/2022' },
    { nome: '12/2022', valor: '01/2022' },
    { nome: '01/2023', valor: '01/2022' },
] */


const vm = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: vm => ({

        realcompromissorec: '',

        file: '',
        dropValue: '',
        /* alignments: [
            'start',
            'center',
            'end',
        ], */
        /* contas: getContasTratadas(), */
        /* expandContas: false, */

        /* saldo: '', */

        /* editedIndex: -1,
        editedCountIndex: -1,
        editMt: {}, */
        competencias: [],
        valorTotalCompromissosNaCompetencia: 'R$ 0,00',
        valorCompromissosEmAbertoNaCompetencia: 'R$ 0,00',
        carteiras: [],
        resumoCarteiras: {
            nome: '',
            saldo: '',
            moeda: {
                nome: '',
                simbolo: '',
                mascara: '',
            }
        },

        valorTotalNaCarteira: 'R$ 0,00',
        valorTotalDeRecebimentosNaCompetencia: 'R$ 0,00',


        dialogUpDateSaldo: false,
        /* dialogDelete: false, */

        /* dialogTitle: '',

        editedItem: {
            saldo: '',
            data: '',
            hora: '',
        },
        defaultItem: {
            saldo: '',
            data: '',
            hora: '',
        }, */

        //adicão de conta
        /* showAdicionarConta: false,
        nomeContaAdd: '',
        
        carteiraContaAdd: '', */


        logoContaAdd: { nome: 'Banco do Brasil', img: '../imgs/logo-bb.png' },
        logoConfirmadoContaAdd: '../imgs/branco.png',
        dialogLogo: false,
        logos: getLogos(),


        moedas: [
            { nome: 'Real', simbolo: 'R$', mascara: '000.000.000.000.000,00' },
            { nome: 'Dolar', simbolo: 'U$', mascara: '000,000,000,000,000.00' },
            { nome: 'Euro', simbolo: '€', mascara: '000.000.000.000.000,00' },
            { nome: 'Bitcoin', simbolo: 'BTC', mascara: '0.00000000' },
        ],





        //variaveis do pick date
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
        menu1: false,
        menu2: false,
        menumt: false,
        menurecebimentos: false,

        //variaveis de hora
        hora: '',




        //CONTAS
        searchContas: '',
        singleExpandContas: false, //é da tabela, determina se você pode abrir o histórico de várias contas ao mesmo tempo
        expandedContas: [],//não sei para que serve
        dialogContas: false,
        dialogDeleteContas: false,
        /* headersContas: [
            {
                text: '',
                align: 'center',
                sortable: false,
                value: 'logo',
            },
            { text: 'Nome Conta', value: 'nome', align: 'center' },
            { text: 'Saldo', value: 'saldo', align: 'center' },
            { text: 'Carteira', value: 'carteira', align: 'center' },
            { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
            { text: 'Histórico', value: 'data-table-expand' },

        ],*/
        contas: getContasTratadas(),
        editedIndexContas: -1,
        editedItemContas: {
            logo: '',
            nome: '',
            carteira: '',
            moeda: '',
        },
        defaultItemContas: {
            logo: '../imgs/branco.png',
            nome: '',
            carteira: '',
            moeda: '',
        },
        expandContas: false,
        porcarteira: -1,










        //MONEY TIME FLOW


        dialogMoneyTime: false,
        dialogDeleteMoneyTime: false,
        headersMoneyTime: [
            {
                text: 'Saldo',
                align: 'center',
                sortable: false,
                value: 'saldo',
            },
            { text: 'Data', value: 'momento.data', align: 'center' },
            { text: 'Hora', value: 'momento.hora', align: 'center' },
            { text: 'Actions', value: 'actions', sortable: false, align: 'center' },

        ],
        //contas: getContasTratadas(),
        idDaContaDonaDosMoneyTimesDaTabela: -1,
        editedIndexMoneyTime: -1,
        editedItemMoneyTime: {
            contaId: '',
            id: '',
            valor: '',
            momento: {
                data: this.getDataAtualFormatada(),
                hora: getHoraAtual(),
                id: '',
            },
            moeda: {
                nome: '',
                simbolo: '',
                mascara: '',
            }
        },
        defaultItemMoneyTime: {
            contaId: '',
            id: '',
            valor: '',
            momento: {
                data: '',
                hora: getHoraAtual(),
                id: '',
            },
            moeda: {
                nome: '',
                simbolo: '',
                mascara: '',
            }
        },
        expandMoneyTime: false,












        //COMPROMISSOS RECORRENTES

        searchCompromissos: '',
        dialogCompromissos: false,
        dialogDeleteCompromissos: false,
        headersCompromissos: [
            {
                text: 'Descrição',
                align: 'start',
                sortable: false,
                value: 'descricao',
            },
            { text: 'Valor', value: 'valor', align: 'center' },
            { text: 'Vencimento Inicial', value: 'vencimentoInicial', align: 'center' },
            { text: 'Recorrência', value: 'recorrencia', align: 'center' },
            { text: 'Qtd. Parcelas', value: 'qtdParcelas', align: 'center' },
            { text: 'Parc. Fut.', value: 'qtdParcelasFuturas', align: 'center' },
            { text: 'Fat. no Cartão?', value: 'isfaturadonocartao', align: 'center' },
            { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
        ],
        compromissos: testeGetCompromissos(),
        editedIndexCompromissos: -1,
        editedItemCompromissos: {
            descricao: '',
            valor: '0,00',
            vencimentoInicial: 0,
            recorrencia: 0,
            qtdParcelas: 0,
            qtdParcelasFuturas: 0,
            isfaturadonocartao: false,
        },
        defaultItemCompromissos: {
            descricao: '',
            valor: '0,00',
            vencimentoInicial: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            recorrencia: 0,
            qtdParcelas: 0,
            qtdParcelasFuturas: 0,
            isfaturadonocartao: false,
        },
        expandCompromissosRecorrentes: false,
        recorrencia: recorrencia,






        //Vou usar a estrutura abaixo para o array de compromissosDoMes
        // se for um compromisso avulso aí o o idRecorrente será '-1'
        /* compromissosMensais: [
            { idRecorrente: 1, timeLine: [] },
            { idRecorrente: -1, timeLine: [compromissoDoMes] },
            { idRecorrente: 1, timeLine: [] },
        ], 
        
            TODOS OS COMPROMISSOS AVULSOS FICARÃO SOB O MESMO IDRECORRENTE: -1  E VAI SER SÓ 1

            DEPOIS EU VOU ENCONTRAR UMA ESTRUTURA MELHOR
        
        */

        compromissosDoMes: [],


        /* compromissosDoMes */

        pormes: '-1',
        pormesrecebimentos: '',
        searchCompromissosDoMes: '',
        dialogCompromissosDoMes: false,
        dialogDeleteCompromissosDoMes: false,
        /* headersCompromissosDoMes: [
            {
                text: 'Descrição',
                align: 'start',
                sortable: true,
                value: 'descricao',
            },
            { text: 'Valor', value: 'valor', align: 'center' },
            {
                text: 'Vencimento', align: 'center', value: 'vencimento',
                filter: value => {
                    if (!this.pormes) return true

                    //return value < parseInt(this.pormes)
                    return value == parseInt(this.pormes)
                },
            },
            { text: 'Pago?', value: 'ispago', align: 'center' },
            { text: 'Faturado no Cartão?', value: 'isfaturadonocartao', align: 'center' },
            { text: 'Actions', value: 'actions', sortable: false, align: 'center' },
        ], */
        //compromissosDoMes: testeGetCompromissosDoMes(),
        editedIndexCompromissosDoMes: -1,
        editedItemCompromissosDoMes: {
            descricao: '',
            valor: 0,
            vencimento: 0,
            ispago: false,
            isfaturadonocartao: false,
        },
        defaultItemCompromissosDoMes: {
            descricao: '',
            valor: 0,
            vencimento: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            ispago: false,
            isfaturadonocartao: false,
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
        searchRecebimentos: '',
        dialogRecebimentos: false,
        dialogDeleteRecebimentos: false,
        headersRecebimentos: [
            {
                text: 'Descrição',
                align: 'center',
                sortable: false,
                value: 'descricao',
            },
            { text: 'Ativo Responsável', value: 'ativoResponsavel', align: 'center' },
            { text: 'Renda Passiva?', value: 'isrendapassiva', align: 'center', },
            { text: 'Valor', value: 'valor', align: 'center', },
            { text: 'Conta de Recebimento', value: 'contaDeRecebimento', align: 'center', },
            { text: 'Data de Recebimento', value: 'dataRecebimento', align: 'center', },
            { text: 'Actions', value: 'actions', sortable: false, align: 'center', },
        ],
        recebimentos: testeGetRecebimentos(),
        editedIndexRecebimentos: -1,
        editedItemRecebimentos: {
            descricao: '',
            isrendapassiva: false,
            ativoResponsavel: 0,
            valor: '',
            contaDeRecebimento: 0,
            dataRecebimento: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        },
        defaultItemRecebimentos: {
            descricao: '',
            isrendapassiva: false,
            ativoResponsavel: 0,
            valor: '',
            contaDeRecebimento: 0,
            dataRecebimento: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        },
        menuDatePickerDataRecebimento: false,
        dataRecebimento: '',
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


        getResumoCarteiras() {
            this.resumoCarteiras = []

            //uma carteira pode ter várias moedas
            for (let i = 0; i < this.carteiras.length; i++) {
                const c = this.carteiras[i];

                this.resumoCarteiras.push({
                    nome: this.carteiras[i],
                    saldo: {
                        real: 'R$ 0,00',
                        dolar: 'U$ 0.00',
                        bitcoin: 'BTC 0.00000000',
                    }
                })

            }

            console.log(`vuecore linha 475: Temos ${this.resumoCarteiras.length} resumos de carteiras.`);

            for (let i = 0; i < this.resumoCarteiras.length; i++) {
                const c = this.resumoCarteiras[i];

                console.log(`Nome: ${c.nome}`);

            }

            console.log(`Quantas contas temos? ${this.contas.length}`);

            for (let i = 0; i < this.contas.length; i++) {
                const conta = this.contas[i];

                for (let j = 0; j < this.resumoCarteiras.length; j++) {
                    const carteira = this.resumoCarteiras[j];

                    if (conta.carteira == carteira.nome) {

                        if (conta.moeda.simbolo == 'R$') {
                            carteira.saldo.real = fromNumberToReal(fromRealtoNumber(carteira.saldo.real) + fromRealtoNumber(conta.saldo));
                        }
                        if (conta.moeda.simbolo == 'U$') {
                            /* const vCarteira = fromDolartoNumber(carteira.saldo.dolar);
                            const vConta = fromDolartoNumber(conta.saldo); */
                            carteira.saldo.dolar = fromNumberToDolar(fromDolartoNumber(carteira.saldo.dolar) + fromDolartoNumber(conta.saldo));
                        }
                        if (conta.moeda.simbolo == 'BTC') {
                            carteira.saldo.bitcoin = fromNumberToBTC(
                                parseFloat(fromBTCtoNumber(carteira.saldo.bitcoin)) + parseFloat(fromBTCtoNumber(conta.saldo))
                            );
                        }
                    }
                }
            }

            return this.resumoCarteiras;
        },



        //CONTAS

        formTitleContas() {
            return this.editedIndexContas === -1 ? 'Nova Conta' : 'Editar Conta'
        },

        headersComputedContas() {
            return [
                {
                    text: '',
                    align: 'center',
                    sortable: false,
                    value: 'logo',
                    width: "10%",
                },
                { text: 'Nome Conta', value: 'nome', align: 'center', width: "30%", },
                { text: 'Moeda', value: 'moeda.simbolo', align: 'center', width: "10%", },
                { text: 'Saldo', value: 'saldo', align: 'center', width: "10%", },
                {
                    text: 'Carteira', value: 'carteira', align: 'center', width: "20%", filter: value => {
                        if (!this.porcarteira) return true

                        //return value < parseInt(this.pormes)
                        return this.filtroPorCarteira(value);
                    },
                },
                { text: 'Actions', value: 'actions', sortable: false, align: 'center', width: "10%", },
                { text: 'Histórico', value: 'data-table-expand', align: 'center', width: "10%", },

            ]
        },





        //MONEY TIME

        formTitleMoneyTime() {
            return this.editedIndexMoneyTime === -1 ? 'Novo Saldo' : 'Editar Saldo'
        },







        //COMPROMISSOS

        formTitleCompromissos() {
            return this.editedIndexCompromissos === -1 ? 'Novo Compromisso Recorrente' : 'Editar Compromisso Recorrente'
        },







        //COMPROMISSOS DO MES

        formTitleCompromissosDoMes() {
            return this.editedIndexCompromissosDoMes === -1 ? 'Novo Compromisso' : 'Editar Compromisso'
        },

        headersComputedCompromissosDoMes() {
            return [
                {
                    text: 'Descrição',
                    align: 'start',
                    sortable: true,
                    value: 'descricao',
                    width: "30%",
                },
                { text: 'Valor', value: 'valor', align: 'center' },
                {
                    text: 'Vencimento', align: 'center', value: 'vencimento',
                    filter: value => {
                        if (!this.pormes) return true

                        //return value < parseInt(this.pormes)
                        return this.filtroPorMes(value);
                    },
                },
                { text: 'Pago?', value: 'ispago', align: 'center', },
                { text: 'Faturado no Cartão?', value: 'isfaturadonocartao', align: 'center', },
                { text: 'Actions', value: 'actions', sortable: false, align: 'center', },
            ]
        },

        compromissosDoMesOrdenado() {
            this.compromissosDoMes.sort(sortFunctionCompromissosDoMesPorVencimento)
            return this.compromissosDoMes;
        },






        //RECEBIMENTOS

        formTitleRecebimentos() {
            return this.editedIndexRecebimentos === -1 ? 'Novo Recebimento' : 'Editar Recebimento'
        },

    },
    watch: {
        /* dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        }, */
        //metodos do pick date

        date(val) {
            this.dateFormatted = this.formatDate(this.date)
        },



        hora() {
            this.editedItem.hora = this.hora;
        },




        dropValue(novo, antigo) {
            alert('Ativou drop value');
            ativaDropIn(novo, this.injetaFromJson);
        },




        //CONTAS
        dialogContas(val) {
            val || this.closeContas()
        },
        dialogDeleteContas(val) {
            val || this.closeDeleteContas()
        },





        //MONEY TIME
        dialogMoneyTime(val) {
            val || this.closeMoneyTime()
        },
        dialogDeleteMoneyTime(val) {
            val || this.closeDeleteMoneyTime()
        },






        //COMPROMISSOS
        dialogCompromissos(val) {
            val || this.closeCompromissos()

        },
        dialogDeleteCompromissos(val) {
            val || this.closeDeleteCompromissos()
        },





        //COMPROMISSOS DO MES
        dialogCompromissosDoMes(val) {
            val || this.closeCompromissosDoMes()
        },
        dialogDeleteCompromissosDoMes(val) {
            val || this.closeDeleteCompromissosDoMes()
        },


        conteudo() {
            ativaDropIn();
        },



        //Recebimentos
        dialogRecebimentos(val) {
            val || this.closeRecebimentos()
        },
        dialogDeleteRecebimentos(val) {
            val || this.closeDeleteRecebimentos()
        },

    },
    created() {
        /* aqui você pode chamar os métodos que quer que sejam executados antes de inicializar os componenetes */
        /* this.updateCarteiras();
        this.getResultados(); */
        this.gerarCompetênciaAnoAtual();


    },
    mounted() {

    },
    methods: {

        mascaraRealCompromissos() {
            $('#valorRealCompromissos').mask('000.000.000.000.000,00', {

                reverse: true
            });
            this.editedItemCompromissos.valor = valorRealCompromissos.value;
        },


        mascaraRealRecebimentos() {
            $('#valorRealRecebimentos').mask('000.000.000.000.000,00', { reverse: true });
            this.editedItemRecebimentos.valor = valorRealRecebimentos.value;
        },

        mascaraRealMoneyTime(event) {

            //alert(event.key)

            if (event.key == '-') {
                //console.log(`Event key: ${event.key}`);
                if (this.editedItemMoneyTime.saldo[0] == '-' || this.editedItemMoneyTime.saldo[0] == '-') {
                    //console.log(`POSITIVAR`);
                    this.editedItemMoneyTime.saldo = valorRealMoneyTime.value.replaceAll('-', '');
                } else {
                    //console.log(`NEGATIVAR`);
                    this.editedItemMoneyTime.saldo = '-' + valorRealMoneyTime.value
                }
            } else {
                //console.log(`Event key: ${event.key}`);
                //const isPositivo = valorRealMoneyTime.value >= 0
                $('#valorRealMoneyTime').mask('000.000.000.000.000,00', { reverse: true });
                this.editedItemMoneyTime.saldo = valorRealMoneyTime.value
            }
            /* const isPositivo = valorRealMoneyTime.value >= 0
            $('#valorRealMoneyTime').mask('000.000.000.000.000,00', { reverse: true }); */
            //this.editedItemMoneyTime.saldo = (isPositivo ? valorRealMoneyTime.value.replaceAll('-', '') + valorRealMoneyTime.value;
        },




        setAtualDate() {
            this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        },

        getVencimentoColor(vencimento) {

            const [hoje, esseMes, esseAno] = getDataAtualFormatada().split('/');
            const amanha = parseInt(hoje) + 1;
            const depoisDeAmanha = parseInt(hoje) + 2;
            const amanhaMaisTres = parseInt(hoje) + 3;


            const [vencDia, vencMes, vencAno] = vencimento.split('/');

            if (vencAno == esseAno && vencMes == esseMes) {
                if (vencDia < hoje) return 'red';
                if (vencDia == hoje) return 'deep-orange darken-3';
                if (
                    vencDia == amanha ||
                    vencDia == depoisDeAmanha ||
                    vencDia == amanhaMaisTres
                ) return 'yellow darken-2';
                return 'transparent';
            }

            return 'white';


        },

        updateCarteiras() {

            this.carteiras = [];

            this.carteiras.push('Todas');

            for (let index = 0; index < this.contas.length; index++) {
                const c = this.contas[index];
                if (!this.carteiras.includes(c.carteira)) {
                    this.carteiras.push(c.carteira);
                }
            }

            this.porcarteira = this.carteiras[0];

        },

        /* updateMoedas() {
            this.moedas = [];
            this.moedas.push({ nome: 'Real', simbolo: 'R$' });
            this.moedas.push({ nome: 'Dólar', simbolo: 'U$' });
            this.moedas.push({ nome: 'Bitcoin', simbolo: 'BTC' });
        }, */


        //O CLOSE E O CLOSE DELETE ABAIXO SÃO GENÉRICOS E USADOS POR TODAS AS TABELAS
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











        /* adcionarConta() {
         
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
         
        }, */

        /* cleanAdcionarContaFields() {
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
            // console.log("Queremos deletar o mt de id: " + id);
            //this.getContaById(contaId).deleteMoneyTimeById(this.editItem.id); 
         
            this.editedCountIndex = contaId;
         
         
            //console.log(`Vamos trabalhar o id: ${id}`);
            this.editedIndex = id;
            //console.log(`Vamos trabalhar o id: ${this.editedIndex}`);
         
            //console.log("Queremos delete o mt de id: " + this.editItem.id);
            this.dialogDelete = true
        }, */

        /* deleteItemConfirm() {
            //this.contas.splice(this.editedIndex, 1)
            this.getContaById(this.editedCountIndex).deleteMoneyTimeById(this.editedIndex);
         
            //const conta = this.getContaById(this.editedCountIndex);
         
            //console.log(`Queremos deletar a conta de id ${this.editedCountIndex} cujo nome é ${conta.nome}`);
            //console.log(`Queremos deletar a mt de id ${this.editedIndex} cujo valor é ${this.editedIndex.saldo}`);
         
            this.closeDelete()
        },
         
         */

        /* close() {
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
        }, */

        /* save() {
            if (this.editedIndex > -1) {
                //Object.assign(this.contas[this.editedIndex], this.editedItem)
         
         
                this.editMt.saldo = this.saldo;
                this.editMt.momento.data = this.formatDate(this.date);
                this.editMt.momento.hora = this.hora
         
         
                this.reprocessaDadosDaConta(this.getContaById(this.editedCountIndex));
         
            } else {
                //const saldo = this.editedItem.saldo;
                // const data = this.editedItem.data; 
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
        }, */

        /* cleanNewSaldoModal() {
            this.saldo = 'R$ 0,00';
        }, */
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


            return `${hora}:${min}:${seg}`;
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
                    //console.log(`Primeiro setamos o valorAnterior para ${valorAnterior}`);
                } else if (fromRealtoNumber(valorAnterior) > fromRealtoNumber(mt.saldo)) {
                    //console.log(`Como ${fromRealtoNumber(valorAnterior)} > ${fromRealtoNumber(mt.saldo)} : RED`);
                    valorAnterior = mt.saldo;
                    mt.cor = 'red';
                } else if (fromRealtoNumber(valorAnterior) < fromRealtoNumber(mt.saldo)) {
                    valorAnterior = mt.saldo;
                    mt.cor = 'green';
                    //console.log(`Como ${fromRealtoNumber(valorAnterior)} < ${fromRealtoNumber(mt.saldo)} : GREEN`);
                } else if (fromRealtoNumber(valorAnterior) == fromRealtoNumber(mt.saldo)) {
                    valorAnterior = mt.saldo;
                    // console.log(`Como ${fromRealtoNumber(valorAnterior)} == ${fromRealtoNumber(mt.saldo)} : BLUE`);
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







        //CONTAS
        editItemContas(item) {
            this.editedIndexContas = this.contas.indexOf(item)
            this.editedItemContas = Object.assign({}, item)
            this.logoConfirmadoContaAdd = this.editedItemContas.logo;
            this.dialogContas = true
        },

        deleteItemContas(item) {
            this.editedIndexContas = this.contas.indexOf(item)
            this.editedItemContas = Object.assign({}, item)
            this.dialogDeleteContas = true
        },

        deleteItemConfirmContas() {
            this.contas.splice(this.editedIndexContas, 1)
            this.closeDeleteContas()
        },

        closeContas() {
            this.dialogContas = false
            //ao que parece nextTick faz a DOM atualizar antes do que está dentro do nextTick seja executado
            //no caso abaixo é limpar os campos do modal de edição
            this.$nextTick(() => {
                this.editedItemContas = Object.assign({}, this.defaultItemContas)
                this.editedIndexContas = -1
            })
        },

        closeDeleteContas() {
            this.dialogDeleteContas = false
            this.$nextTick(() => {
                this.editedItemContas = Object.assign({}, this.defaultItemContas)
                this.editedIndexContas = -1
            })
        },

        saveContas() {

            /* this.editedItemContas.vencimentoInicial = this.formatDate(this.date); */

            if (this.editedIndexContas > -1) {

                //recebo o logo que foi confirmado
                this.editedItemContas.logo = this.logoConfirmadoContaAdd;

                //abaixo ele pega o que foi editado e coloca na posição orignal do array contas
                Object.assign(this.contas[this.editedIndexContas], this.editedItemContas)

                if (!this.carteiras.includes(this.editedItemContas.carteira)) {
                    this.updateCarteiras();
                }
            } else {

                //alert(`Moeda: ${this.editedItemContas.moeda}`)

                //recebo o logo que foi confirmado
                this.editedItemContas.logo = this.logoConfirmadoContaAdd;

                //reinicio o logo confirmado
                this.logoConfirmadoContaAdd = '../imgs/branco.png';

                const novaConta = new Conta(this.editedItemContas.nome, this.editedItemContas.carteira, this.editedItemContas.logo, this.editedItemContas.moeda);

                this.contas.push(novaConta);

                if (!this.carteiras.includes(novaConta.carteira)) {
                    this.updateCarteiras();
                }
            }
            this.closeContas()
        },

        calcularTotalNaCarteira() {

            this.valorTotalNaCarteira = 0;

            for (let index = 0; index < this.contas.length; index++) {
                const c = this.contas[index];

                if (this.filtroPorCarteira(c.carteira)) {
                    if (c.saldo.includes('R$')) {
                        this.valorTotalNaCarteira += fromRealtoNumber(c.saldo);
                    }
                }
            }

            this.valorTotalNaCarteira = fromNumberToReal(this.valorTotalNaCarteira)

        },
        calcularTotalNaCarteiraRealBTCDolar() {

            //this.valorTotalNaCarteira = { real: 0, bitcoin: 0, dolar: 0 };



            let r = 0;
            let d = 0;
            let bit = parseFloat(0.00000000).toFixed(8);

            for (let index = 0; index < this.contas.length; index++) {
                const c = this.contas[index];

                if (this.filtroPorCarteira(c.carteira)) {
                    if (c.saldo.includes('R$')) {
                        //this.valorTotalNaCarteira['R$'] += fromRealtoNumber(c.saldo);}
                        r += fromRealtoNumber(c.saldo);
                    }
                    if (c.saldo.includes('BTC')) {
                        bit = parseFloat(bit) + parseFloat(fromBTCtoNumber(c.saldo));
                    }
                    if (c.saldo.includes('U$')) {
                        d += fromDolartoNumber(c.saldo);
                    }
                }
            }

            this.valorTotalNaCarteira = { real: fromNumberToReal(r), bitcoin: bit, dolar: fromNumberToDolar(d) };

        },

        filtroPorCarteira(value) {

            if (this.porcarteira == '-1') return true;
            if (this.porcarteira == 'Todas') return true;

            if (value == this.porcarteira) return true;

            return false

        },









        setFormularioPersolanizadoParaAConta(id) {

            const ct = this.getContaById(id);
            this.editedItemMoneyTime.moeda = ct.moeda;

        },







        //MONEY TIME
        editItemMoneyTime(item) {
            //alert(`item: ${item.momento.data}`)
            const conta = this.getContaById(item.contaId);
            this.editedIndexMoneyTime = conta.moneyTimeFlow.indexOf(item)
            this.editedItemMoneyTime = Object.assign({}, item)

            this.editedItemMoneyTime.moeda = conta.moeda

            //vamos retirar o R$ antes de apresentar para edição
            this.editedItemMoneyTime.saldo = fromNumberToRealNoRS(this.editedItemMoneyTime.saldo);

            this.date = parseToDate(this.editedItemMoneyTime.momento.data)

            this.dialogMoneyTime = true
        },

        deleteItemMoneyTime(item) {
            this.editedIndexMoneyTime = this.getContaById(item.contaId).moneyTimeFlow.indexOf(item)
            this.editedItemMoneyTime = Object.assign({}, item)
            this.dialogDeleteMoneyTime = true
        },

        deleteItemConfirmMoneyTime() {
            this.getContaById(this.editedItemMoneyTime.contaId).moneyTimeFlow.splice(this.editedIndexMoneyTime, 1)
            this.closeDeleteMoneyTime()
        },

        closeMoneyTime() {
            this.dialogMoneyTime = false
            //ao que parece nextTick faz a DOM atualizar antes do que está dentro do nextTick seja executado
            //no caso abaixo é limpar os campos do modal de edição
            this.$nextTick(() => {
                this.editedItemMoneyTime = Object.assign({}, this.defaultItemMoneyTime)
                this.editedIndexMoneyTime = -1
            })
        },

        closeDeleteMoneyTime() {
            this.dialogDeleteMoneyTime = false
            this.$nextTick(() => {
                this.editedItemMoneyTime = Object.assign({}, this.defaultItemMoneyTime)
                this.editedIndexMoneyTime = -1
            })
        },

        saveMoneyTime() {

            this.editedItemMoneyTime.momento.data = this.formatDate(this.date);

            if (this.editedIndexMoneyTime > -1) {

                //abaixo ele pega o que foi editado e coloca na posição orignal do array contas
                const conta = this.getContaById(this.editedItemMoneyTime.contaId);

                console.log(`Saldo que chegou para salvar: ${this.editedItemMoneyTime.saldo}`);
                console.log(`DEPOIS DO DOLAR TO NUMBER: ${fromDolartoNumber(this.editedItemMoneyTime.saldo)}`);
                console.log(`DEPOIS DO NUMBERT TO DOLAR: ${fromNumberToDolar(fromDolartoNumber(this.editedItemMoneyTime.saldo))}`);


                if (this.editedItemMoneyTime.moeda.simbolo == 'R$') this.editedItemMoneyTime.saldo = fromNumberToReal(fromRealtoNumber(this.editedItemMoneyTime.saldo));
                if (this.editedItemMoneyTime.moeda.simbolo == 'U$') this.editedItemMoneyTime.saldo = fromNumberToDolar(fromDolartoNumber(this.editedItemMoneyTime.saldo));
                if (this.editedItemMoneyTime.moeda.simbolo == 'BTC') this.editedItemMoneyTime.saldo = fromNumberToBTC(fromBTCtoNumber(this.editedItemMoneyTime.saldo));


                Object.assign(conta.moneyTimeFlow[this.editedIndexMoneyTime], this.editedItemMoneyTime);

                this.reprocessaDadosDaConta(conta);
            } else {

                //o idDaContaDonaDosMoneyTimesDaTabela eu seto lá no botão que abre o modal para o registro de novo saldo
                this.editedItemMoneyTime.contaId = this.idDaContaDonaDosMoneyTimesDaTabela;

                const momento = new Momento(this.editedItemMoneyTime.momento.data, this.editedItemMoneyTime.momento.hora);


                console.log(`Saldo que chegou para salvar: ${this.editedItemMoneyTime.saldo}`);
                console.log(`DEPOIS DO DOLAR TO NUMBER: ${fromDolartoNumber(this.editedItemMoneyTime.saldo)}`);
                console.log(`DEPOIS DO NUMBERT TO DOLAR: ${fromNumberToDolar(fromDolartoNumber(this.editedItemMoneyTime.saldo))}`);


                let saldo = 0;
                if (this.editedItemMoneyTime.moeda.simbolo == 'R$') saldo = fromNumberToReal(fromRealtoNumber(this.editedItemMoneyTime.saldo));
                if (this.editedItemMoneyTime.moeda.simbolo == 'U$') saldo = fromNumberToDolar(fromDolartoNumber(this.editedItemMoneyTime.saldo));
                if (this.editedItemMoneyTime.moeda.simbolo == 'BTC') saldo = fromNumberToBTC(fromBTCtoNumber(this.editedItemMoneyTime.saldo));


                const novoMoneyTime = new MoneyTime(this.editedItemMoneyTime.contaId, saldo, momento);

                const conta = this.getContaById(this.idDaContaDonaDosMoneyTimesDaTabela);

                //idDaContaDonaDosMoneyTimesDaTabela
                //this.getContaById(this.editedItemMoneyTime.contaId).moneyTimeFlow.unshift(novoMoneyTime);
                conta.moneyTimeFlow.unshift(novoMoneyTime);
                this.reprocessaDadosDaConta(conta);
            }
            this.closeMoneyTime()
        },

















        //COMPROMISSOS RECORRENTES
        editItemCompromissos(item) {
            // editItemCompromissos() só é chamado mara edição, nãos sendo chamado na criação
            this.editedIndexCompromissos = this.compromissos.indexOf(item)
            this.editedItemCompromissos = Object.assign({}, item)
            //setando o date global que está sendo usado
            this.date = parseToDate(this.editedItemCompromissos.vencimentoInicial)
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
            this.editedItemCompromissos.vencimentoInicial = this.formatDate(this.date);

            if (this.editedIndexCompromissos > -1) {
                Object.assign(this.compromissos[this.editedIndexCompromissos], this.editedItemCompromissos);

                //já que foi alterado vamos recalcular a quantidade de parcelas futuras.
                const cp = this.compromissos[this.editedIndexCompromissos];
                //this.compromissos[this.editedIndexCompromissos].calculaQuantidadeDeParcelasFuturas();
                cp.calculaQuantidadeDeParcelasFuturas();


                //vamos remover dos compromissos aqueles que foram retirados da time line do objeto pai
                //desde que não tenham sido pagos!
                for (let index = 0; index < this.compromissosDoMes.length; index++) {
                    const c = this.compromissosDoMes[index];

                    //verifica se há o atributo idCompromissoPai no objeto em questão
                    if ('idCompromissoPai' in c) {
                        //verifica se é aquele pai
                        if (c.idCompromissoPai == cp.id) {
                            //verifica se na timeline do pai conta aquele compromisso (ou seja), se não foi retirado
                            if (!cp.timeLine.includes(c) && !c.ispago) {
                                this.compromissosDoMes.splice(index, 1);
                                index--;//já que tirou um objeto, volta o indice
                            } if (c.ispago) {
                                c.descricao = `${c.descricao}   [Atenção! Houve edição do compromisso recorrente após o pagamento desta parcela. Verifique possível duplicidade neste ciclo.]`;
                            }
                        }
                    }
                }

                //agora adicionamos os novos
                for (let index = 0; index < cp.timeLine.length; index++) {
                    const comp = cp.timeLine[index];
                    this.compromissosDoMes.push(comp);
                }

            } else {

                //alert(`Como chega o faturado no cartão: ${this.editedItemCompromissos.isfaturadonocartao}`)

                const novoComp = new CompromissoPai(this.editedItemCompromissos.descricao, this.editedItemCompromissos.valor, this.editedItemCompromissos.vencimentoInicial, this.editedItemCompromissos.recorrencia, this.editedItemCompromissos.qtdParcelas, this.editedItemCompromissos.isfaturadonocartao);

                this.compromissos.push(novoComp);

                /* const ob = { idRecorrente: novoComp.id, timeLine: novoComp.timeLine };
                this.compromissosDoMes.push(ob); */

                for (let index = 0; index < novoComp.timeLine.length; index++) {
                    const comp = novoComp.timeLine[index];
                    this.compromissosDoMes.push(comp);
                }
            }
            this.closeCompromissos()
        },












        /* getCompromissosDoMesPorIdDeCompromissoRecorrente(id) {
            for (let index = 0; compromissosDoMes < array.length; index++) {
                const objCompM = compromissosDoMes[index];
         
                if (objCompM[index].idRecorrente == id) {
                    return compromissosDoMes[index]
                }
            }
        },
         
        getCompromissosDoMesPorIdDeCompromissoAvulso(id) {
         
            for (let index = 0; compromissosDoMes < array.length; index++) {
                const objCompM = compromissosDoMes[index];
         
                if (objCompM[index].idRecorrente == -1) {
         
                    const timeLineAvulsos = objCompM[index].timeLine;
         
                    for (let index2 = 0; index2 < timeLineAvulsos.length; index2++) {
                        const compAvulso = timeLineAvulsos[index2];
         
                        if (compAvulso.id == id) {
                            return timeLineAvulsos[index2];
                        }
         
                    }
         
         
                }
            }
        }, */














        //COMPROMISSOS DO MES
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
                Object.assign(this.compromissosDoMes[this.editedIndexCompromissosDoMes], this.editedItemCompromissosDoMes);

                /* 
                Quando um compromisso do mês é editado o valor total de compromissos e de compromissos em aberto (apresentados abaix do tabela) pode ficar errado, sendo, portanto, necessário atualizar o valor.
                */
                this.calcularCompromissosNaCompetencia();
            } else {
                const novoComp = new CompromissoAvulso(this.editedItemCompromissosDoMes.descricao, this.editedItemCompromissosDoMes.valor, this.editedItemCompromissosDoMes.vencimento, this.editedItemCompromissosDoMes.isfaturadonocartao);

                novoComp.ispago = this.editedItemCompromissosDoMes.ispago;

                this.compromissosDoMes.push(novoComp);
            }
            this.closeCompromissosDoMes()
        },

        //esse filter vale para todas as entidades
        filterEntidades(value, search, item) {
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
        },

        //compromissos 
        filtroPorMes(value) {

            if (this.pormes == '-1') return true;

            const [diaV, mesV, anoV] = value.split('/');

            const [mesP, anoP] = this.pormes.split('/');

            if (anoP == anoV) {
                if (mesP == mesV) {
                    //console.log(`Retornando TRUE em: ${value} sob filtro ${this.pormes}`);
                    return true;
                }
            }
            // console.log(`Retornando FALSE em: ${value} sob filtro ${this.pormes}`);
            return false

        },

        gerarCompetênciaAnoAtual() {
            const anoAtual = getDataAtualFormatada().split('/')[2];
            this.competencias.push({ nome: 'Selecione', valor: '-1' });
            for (let index = 1; index <= 12; index++) {
                let mes = '';
                if (index < 10) {
                    mes = `0${index}`;
                }
                this.competencias.push({ nome: `${mes}/${anoAtual}`, valor: `${mes}/${anoAtual}` });
            }
        },

        //recebimentos

        filtroPorMesRecebimentos(value) {



            if (this.pormesrecebimentos == '-1') return true;

            const [diaV, mesV, anoV] = value.split('/');

            const [mesP, anoP] = this.pormesrecebimentos.split('/');

            if (anoP == anoV) {
                if (mesP == mesV) {
                    //console.log(`Retornando TRUE em: ${value} sob filtro ${this.pormesrecebimentos}`);
                    return true;
                }
            }
            //console.log(`Retornando FALSE em: ${value} sob filtro ${this.pormesrecebimentos}`);
            return false

        },

        //compromissos
        calcularCompromissosNaCompetencia() {


            this.valorTotalCompromissosNaCompetencia = 0;
            this.valorCompromissosEmAbertoNaCompetencia = 0;

            for (let index = 0; index < this.compromissosDoMes.length; index++) {
                const c = this.compromissosDoMes[index];

                if (this.filtroPorMes(c.vencimento)) {
                    this.valorTotalCompromissosNaCompetencia += fromRealtoNumber(c.valor);

                    //se for faturado no cartão não precisa somar pois já vai estar o valor negativo na conta cartão
                    if (!c.ispago) {
                        this.valorCompromissosEmAbertoNaCompetencia += fromRealtoNumber(c.valor);
                    }
                    /* 
                    A ideia original era que se for faturado no cartão não precisava somar no total da dívida.
                    O problema é que se for faturado no cartão e não tiver pago, o compromisso não está sendo contado nem na dívida do cartão nem em compromissos em aberto, gerando uma falsa ideia de capital disponível.
         
                    Quadro:
         
                    Pago?    Faturado no Cartão?    Somar na Dívida?
                    não      não                    sim
                    sim      não                    não
                    não      sim                    sim
                    sim      sim                    não
                    
                    Portando não importa se é ou não faturado no cartão. Se não estiver pago tem que somar na dívida.
                    Por conta disso percebo que a propriedade de conta "isFaturadoNoCartao" (lowcase por causa do prop do Vue) não tem utilidade no momento. Não vou excluí-la ainda. Mas é uma séria candidata à exclusão. 
                    */

                }

            }

            this.valorTotalCompromissosNaCompetencia = fromNumberToReal(this.valorTotalCompromissosNaCompetencia)
            this.valorCompromissosEmAbertoNaCompetencia = fromNumberToReal(this.valorCompromissosEmAbertoNaCompetencia)


        },


























        //Recebimento
        editItemRecebimentos(item) {
            this.editedIndexRecebimentos = this.recebimentos.indexOf(item)
            this.editedItemRecebimentos = Object.assign({}, item)

            this.date = parseToDate(this.editedItemRecebimentos.dataRecebimento)

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
            this.editedItemRecebimentos.dataRecebimento = this.formatDate(this.date);

            if (this.editedIndexRecebimentos > -1) {
                Object.assign(this.recebimentos[this.editedIndexRecebimentos], this.editedItemRecebimentos)
            } else {
                //isRendaPassiva, ativoResponsavel, descricao, valor, contaDeRecebimento, dataRecebimento
                const novoRec = new Recebimento(this.editedItemRecebimentos.isrendapassiva, this.editedItemRecebimentos.ativoResponsavel, this.editedItemRecebimentos.descricao, this.editedItemRecebimentos.valor, this.editedItemRecebimentos.contaDeRecebimento, this.editedItemRecebimentos.dataRecebimento);

                this.recebimentos.push(novoRec);
            }
            this.closeRecebimentos()
        },

        calcularRecebimentosNaCompetencia() {
            this.valorTotalDeRecebimentosNaCompetencia = 0;


            for (let index = 0; index < this.recebimentos.length; index++) {
                const r = this.recebimentos[index];

                if (this.filtroPorMesRecebimentos(r.dataRecebimento)) {
                    this.valorTotalDeRecebimentosNaCompetencia += fromRealtoNumber(r.valor);
                }

            }

            this.valorTotalDeRecebimentosNaCompetencia = fromNumberToReal(this.valorTotalDeRecebimentosNaCompetencia)


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
            ativaStringfyInOut(this.contas, this.compromissos, this.compromissosDoMes, this.recebimentos);
        },

        injetaFromJson() {
            this.contas = contasArray;
            this.compromissos = compromissosArray;
            this.compromissosDoMes = compromissosDoMesArray;
            this.recebimentos = recebimentosArray;

            //daí atualizamos os dados estatísticos;
            this.getResultados();
            this.updateCarteiras();
            //this.updateMoedas()
            //this.calcularTotalNaCarteira();
            this.calcularTotalNaCarteiraRealBTCDolar();
            this.calcularCompromissosNaCompetencia();
            this.setIdsGlobaisParaMaiorUtilizado();
        },

        setIdsGlobaisParaMaiorUtilizado() {

            for (let index = 0; index < this.contas.length; index++) {
                const c = this.contas[index];

                if (c.id >= idContaGlobal) {
                    idContaGlobal = parseInt(c.id) + 1;
                }

                for (let j = 0; j < c.moneyTimeFlow.length; j++) {
                    const mt = c.moneyTimeFlow[j];
                    if (mt.id >= idMoneyTimeGlobal) idMoneyTimeGlobal = parseInt(mt.id) + 1;
                    if (mt.momento.id >= idMomentoGlobal) idMomentoGlobal = parseInt(mt.momento.id) + 1;
                }
            }

            for (let index = 0; index < this.compromissos.length; index++) {
                const c = this.compromissos[index];
                if (c.id >= idCompromissoPaiGlobal) {
                    idCompromissoPaiGlobal = parseInt(c.id) + 1;
                }
            }

            for (let index = 0; index < this.compromissosDoMes.length; index++) {
                const c = this.compromissosDoMes[index];
                if (c.id >= idCompromissoFilhoGlobal) {
                    idCompromissoFilhoGlobal = parseInt(c.id) + 1;
                }
            }

            for (let index = 0; index < this.recebimentos.length; index++) {
                const r = this.recebimentos[index];
                if (r.id >= idRecebimentoGlobal) {
                    idRecebimentoGlobal = parseInt(r.id) + 1;
                }
            }



        },


        downloadBackup() {

            prepararBackup(this.contas, this.compromissos, this.compromissosDoMes, this.recebimentos);
            const content = document.getElementById("txtareabackup").value;
            //const content = (stringfyAll(contas, compromissos, compromissosDoMes, recebimentos)).toString();
            const mimeType = 'text/plain';
            const filename = 'backup.txt';


            const a = document.createElement('a') // Create "a" element
            const blob = new Blob([content], { type: mimeType }) // Create a blob (file-like object)
            const url = URL.createObjectURL(blob) // Create an object URL from blob
            a.setAttribute('href', url) // Set "a" element link
            a.setAttribute('download', filename) // Set download filename
            a.click() // Start downloading
        },

        /* metodos de drop do txt */
        dropfile(file, injetaFromJson) {
            let reader = new FileReader();
            reader.onload = function (e) {
                //txtarea2.value = e.target.result;
                txtareabackup.value = e.target.result;


            };
            reader.readAsText(file, "UTF-8");

            //o método abaixo é chamado quando o reader termina, permitindo a execução de outros métodos
            reader.onloadend = function (e) {
                //alert(`Ativou! tamanho: ${txtareabackup.value.length}`);
                ativaDropIn();
            }


        },

        droped(event) {
            event.preventDefault();
            let file = event.dataTransfer.files[0];
            this.dropfile(file, this.injetaFromJson);

        },










        /* uploadFile() {
            this.datafile = this.$refs.file.files[0];
        },
        submitFile() {
            const formData = new FormData();
            formData.append('file', this.datafile);
            const headers = { 'Content-Type': 'multipart/form-data' };
            axios.post('https://httpbin.org/post', formData, { headers }).then((res) => {
                res.data.files; // binary representation of the file
                res.status; // HTTP status
            });
        } */
        /* submitFile() {
            
                   // Initialize the form data
                
            let formData = new FormData();
    
            
                //Add the form data we need to submit
            
            formData.append('file', this.file);
    
            
             // Make the request to the POST /single-file URL
            
            axios.post('/single-file',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(function () {
                console.log('SUCCESS!!');
            })
                .catch(function () {
                    console.log('FAILURE!!');
                });
        },
        handleFileUpload(event) {
            this.file = event.target.files[0];
        }, */



    },



})