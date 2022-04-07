

/* function fromRealtoNumber(valor) {

    let aux = valor.slice(3,);
    aux = aux.replaceAll('.', '');
    aux = aux.replaceAll(',', '.');

    return parseFloat(aux);
} */


function fromRealtoNumber(valor) {

    /* let aux = valor.slice(3,); */
    //console.log(`valor original: ${valor}`);
    let aux = valor.replaceAll('R$', '');

    //console.log(`apos retirar o R$: ${aux}`);

    aux = aux.replaceAll('.', '');
    aux = aux.replaceAll(',', '.');

    //console.log(`trocando pontos e virgulas: ${aux}`);

    aux = aux.replaceAll(' ', '');

    //console.log(`apos retirar os espacos em branco: ${aux}`);

    return parseFloat(aux.trim());
}

function fromDolartoNumber(valor) {

    /* let aux = valor.slice(3,); */
    //console.log(`valor original: ${valor}`);
    let aux = valor.replaceAll('U$', '');

    //console.log(`apos retirar o R$: ${aux}`);

    aux = aux.replaceAll(',', '');
    aux = aux.replaceAll('.', ',');

    //console.log(`trocando pontos e virgulas: ${aux}`);

    aux = aux.replaceAll(' ', '');

    //console.log(`apos retirar os espacos em branco: ${aux}`);

    return parseFloat(aux.trim());
}

function fromBTCtoNumber(valor) {


    /* let aux = valor.slice(3,); */
    //console.log(`valor original: ${valor}`);
    let aux = valor.replaceAll('BTC', '');

    //console.log(`apos retirar o R$: ${aux}`);

    //aux = aux.replaceAll('.', ',');
    //aux = aux.replaceAll(',', '.');

    //console.log(`trocando pontos e virgulas: ${aux}`);

    aux = aux.replaceAll(' ', '');

    //console.log(`apos retirar os espacos em branco: ${aux}`);



    return parseFloat(aux.trim()).toFixed(8);
}

function fromNumberToReal(valor) {
    /* let aux = `${valor}`;

    aux = aux.replaceAll('.', ',');
    return `${valor < 0 ? '-' : ''} R$ ` */
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function fromNumberToDolar(valor) {

    return 'U' + valor.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function fromNumberToBTC(valor) {
    /* let aux = `${valor}`;

    aux = aux.replaceAll('.', ',');
    return `${valor < 0 ? '-' : ''} R$ ` */
    alert(`Total BTC antes da conversao final: ${valor}`);
    //let emDolar = valor.toLocaleString("en-US", { style: "currency", currency: "USD" });
    /* emDolar = emDolar.replace('$', 'BTC');
    emDolar = emDolar.replace(',', ''); */
    return valor.replaceAll(',', '.');
}