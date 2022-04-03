




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


        //variaveis do pick date
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
        menu1: false,
        menu2: false,

        //variaveis de hora
        hora: '',



    }),
    computed: {
        //metodos do pick date
        computedDateFormatted() {
            return this.formatDate(this.date)
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

    },
    created() {
        /* aqui você pode chamar os métodos que quer que sejam executados antes de inicializar os componenetes */
    },

    methods: {

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
                //console.log(`Saldo: ${saldo} Data: ${data} Hora: ${hora}`);

                const momento = new Momento(0, data, this.hora);
                const moneyTime = new MoneyTime(this.editedCountIndex, this.saldo, momento);

                this.contas[this.editedCountIndex - 1].addMoneyTime(moneyTime);

                //let cont = this.getContaById(this.editedCountIndex);

                //cont.cLPrint();

                this.reprocessaDadosDaConta(this.getContaById(this.editedCountIndex));
            }
            this.close()
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


    }
})