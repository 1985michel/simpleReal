"use strict";

class Momento {
    constructor(data, hora) {

        //fazer tratamentos funturos limitando possibilidades de edição

        this.id = 0;

        this.data = data.slice(); //slice to clone value
        this.hora = hora.slice();

        //ID
    }

    getData() {
        return this.data.slice();
    }

    getHora() {
        return this.hora.slice();
    }

    setData(data) {
        this.data = data; //fazer tratamentos futuros limitando edição
    }

    setHora(hora) {
        this.hora = hora; //fazer tratamentos futuros limitando edição
    }
}