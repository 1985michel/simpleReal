




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



        editedIndex: -1,
        editedCountIndex: -1,

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
        }


    },
    created() {
        /* aqui você pode chamar os métodos que quer que sejam executados antes de inicializar os componenetes */
    },

    methods: {

        novoSaldo(contaId) {
            this.dialogTitle = "Novo Saldo";
            this.editedCountIndex = contaId;
            this.hora = this.getHoraAtual();
            console.log(this.editItem.hora);
            this.dialog = true
        },

        editItem(item) {
            this.dialogTitle = "Editar ";

            this.editedIndex = this.contas.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.dialogTitle = "Editar";

            this.editedIndex = this.contas.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.contas.splice(this.editedIndex, 1)
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
                Object.assign(this.contas[this.editedIndex], this.editedItem)
            } else {
                const saldo = this.editedItem.saldo;
                /* const data = this.editedItem.data; */
                const data = this.formatDate(this.date);
                const hora = this.editedItem.hora;
                console.log(`Saldo: ${saldo} Data: ${data} Hora: ${hora}`);

                const momento = new Momento(data, hora);
                const moneyTime = new MoneyTime(saldo, momento);


                this.contas[this.editedCountIndex - 1].addMoneyTime(moneyTime);
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
        }


    }
})