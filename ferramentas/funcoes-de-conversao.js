

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
    const isNegativo = valor.includes('-');

    aux = aux.replaceAll('-', '');

    /* if (valor.includes('860')) {
        alert(`Conta do Cartao: ${aux}`);
    } */

    if (isNegativo) {
        aux = parseFloat(aux) * -1;
    } else {
        aux = parseFloat(aux);
    }

    return aux;
}

function fromDolartoNumber(valor) {

    if (valor == null) alert(`Valor recebendo null linha 35 - funcoesDeConversao - ${valor}`);

    /* let aux = valor.slice(3,); */
    console.log(`valor original: ${valor}`);
    let aux = valor.replaceAll('U$', '');

    console.log(`apos retirar o U$: ${aux}`);

    aux = aux.replaceAll(',', '');
    //aux = aux.replaceAll('.', ',');

    console.log(`trocando tirando a virgula: ${aux}`);

    aux = aux.replaceAll(' ', '');

    console.log(`apos retirar os espacos em branco: ${aux}`);

    return parseFloat(aux);
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



    return parseFloat(aux).toFixed(8);
}

function fromNumberToReal(valor) {
    /* let aux = `${valor}`;

    aux = aux.replaceAll('.', ',');
    return `${valor < 0 ? '-' : ''} R$ ` */
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function fromNumberToRealNoRS(valor) {
    /* let aux = `${valor}`;

    aux = aux.replaceAll('.', ',');
    return `${valor < 0 ? '-' : ''} R$ ` */
    const formatted = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    return formatted.replaceAll('R$', '').trim();
}

function fromNumberToDolar(valor) {

    const v = valor.toLocaleString("en-US", { style: "currency", currency: "USD" });
    return v.replaceAll('$', 'U$ ');
}

function fromNumberToBTC(valor) {
    /* let aux = `${valor}`;

    aux = aux.replaceAll('.', ',');
    return `${valor < 0 ? '-' : ''} R$ ` */
    //alert(`Total BTC antes da conversao final: ${valor}`);
    //let emDolar = valor.toLocaleString("en-US", { style: "currency", currency: "USD" });
    /* emDolar = emDolar.replace('$', 'BTC');
    emDolar = emDolar.replace(',', ''); */



    let v = `${valor}`.replaceAll(',', '.');
    return 'BTC ' + v;
}