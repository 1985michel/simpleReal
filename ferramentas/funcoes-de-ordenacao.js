


function sortFunctionMoneyTimesPorData(a, b) {

    let dataA = a.momento.data.slice();//clona a string
    let dataB = b.momento.data.slice();

    let aSplit = dataA.split("/")
    let anoA = aSplit[2];
    let mesA = aSplit[1];
    let diaA = aSplit[0];

    dataA = `${anoA}${mesA}${diaA}`;

    let bSplit = dataB.split("/")
    let anoB = bSplit[2];
    let mesB = bSplit[1];
    let diaB = bSplit[0];

    dataB = `${anoB}${mesB}${diaB}`;

    if (dataA < dataB) {
        return -1;
    } else {
        return true;
    }
}

function sortFunctionMoneyTimesPorHora(a, b) {

    let dataA = a.momento.hora.slice();//clona a string
    let dataB = b.momento.hora.slice();

    let aSplit = dataA.split(":")
    let horaA = aSplit[0];
    let minutoA = aSplit[1];
    let segundoA = aSplit[2];

    horaA = `${horaA}${minutoA}${segundoA}`;

    let bSplit = dataB.split(":")
    let horaB = bSplit[0];
    let minutoB = bSplit[1];
    let segundoB = bSplit[2];

    horaB = `${horaB}${minutoB}${segundoB}`;

    if (horaA < horaB) {
        return -1;
    } else {
        return true;
    }
}




function sortFunctionMoneyTimesPorDataEHora(a, b) {

    let dataA = a.momento.data.slice();//clona a string
    let dataB = b.momento.data.slice();

    if (dataA == dataB) {
        return sortFunctionMoneyTimesPorHora(a, b);
    }

    let aSplit = dataA.split("/")
    let anoA = aSplit[2];
    let mesA = aSplit[1];
    let diaA = aSplit[0];

    dataA = `${anoA}${mesA}${diaA}`;

    let bSplit = dataB.split("/")
    let anoB = bSplit[2];
    let mesB = bSplit[1];
    let diaB = bSplit[0];

    dataB = `${anoB}${mesB}${diaB}`;

    if (dataA < dataB) {
        return -1;
    } else {
        return true;
    }
}

