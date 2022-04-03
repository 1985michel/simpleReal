"use strict";

let idMomentoGlobal = 0;

class Momento {
    constructor(data, hora) {

        //fazer tratamentos funturos limitando possibilidades de edição

        this.id = ++idMomentoGlobal;//sempre zero, setado depois

        this.moneyTimeId = -1;

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