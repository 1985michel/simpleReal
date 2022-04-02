




const vm = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        alignments: [
            'start',
            'center',
            'end',
        ],
        contas: getContasTratadas(),
        expandContas: false
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