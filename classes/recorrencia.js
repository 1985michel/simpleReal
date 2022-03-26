"use strict";

//Fonte para a classe abaixo: https://masteringjs.io/tutorials/fundamentals/enum
class Periodicidade {
    static Diaria = new Periodicidade('Diaria');
    static Semanal = new Periodicidade('Semanal');
    static Mensal = new Periodicidade('Mensal');
    static Anual = new Periodicidade('Anual');

    constructor(name) {
        this.name = name;
    }

    toString() {
        return `Periodicidade.${this.name}`;
    }

    static getPeriodicidade(periodicidade) {
        switch (periodicidade.toLowerCase()) {
            case 'diaria':
                return Periodicidade.Diaria.toString()
                break;
            case 'semanal':
                return Periodicidade.Semanal.toString()
                break;
            case 'mensal':
                return Periodicidade.Mensal.toString()
                break;
            case 'anual':
                return Periodicidade.Anual.toString()
                break;


            default:
                break;
        }
    }

}


class Recorrencia {
    constructor(periodicidade, isAtiva, final) {
        this.periodicidade = this.setPeriodicidade(periodicidade)
        this.isAtiva = isAtiva;
        if (this.isAtiva) {
            this.setFinal(final);
        }

    }

    getPeriodicidade() {
        return this.periodicidade
    }

    getIsAtiva() {
        return this.isAtiva;
    }

    getFinal() {
        return this.dataFinal
    }

    setPeriodicidade(periodicidade) {
        this.periodicidade = Periodicidade.getPeriodicidade(periodicidade);
    }

    setIsAtiva(value) {
        this.isAtiva = value;
    }

    setFinal(final) {
        if (this.isAtiva) {
            this.final = new Momento(final.data, final.hora);
        }
    }

}