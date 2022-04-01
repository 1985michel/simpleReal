




const vm = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        alignments: [
            'start',
            'center',
            'end',
        ],
        contas: getContasTratadas()
    },
    computed: {

    },
    methods: {

        beforeMount() {
            //preContas = testGetContas();

            console.log('entramos aqui');

            this.gerarVariaveisDeApresentacaoParaConta();
        }
    }
})