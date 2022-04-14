

/* function fromRealtoNumber(valor) {

    let aux = valor.slice(3,);
    aux = aux.replaceAll('.', '');
    aux = aux.replaceAll(',', '.');

    return parseFloat(aux);
} */

function addBitcoin(a, b) {
    a = cleanBitcoinFormat(`${a}`);
    b = cleanBitcoinFormat(`${b}`);
    return setBitcoinFormat((fromStringBitcoinToNumberBitcoin(a) + fromStringBitcoinToNumberBitcoin(b)).toFixed(8));
}

function fromStringBitcoinToNumberBitcoin(bitIn) {
    return parseFloat(parseFloat(bitIn).toFixed(8));
}

function cleanBitcoinFormat(a) {
    return a.replace('BTC', '').replaceAll(' ', '').replaceAll(',', '.');
}

function setBitcoinFormat(a) {
    return `BTC ${cleanBitcoinFormat(a)}`;
}


//Reais

function addReais(a, b) {
    return setReaisFormat((fromStringReaisToNumber(a) + fromStringReaisToNumber(b)).toFixed(2));
}

function fromStringReaisToNumber(a) {
    const isNegativo = `${a}`.includes('-');
    let result = cleanReaisFormat(a).replaceAll('.', '').replaceAll(',', '.').replaceAll('-', '');
    result = parseFloat(result);
    if (isNegativo) result = result * -1;
    return result
}

function cleanReaisFormat(a) {
    return `${a}`.replaceAll(' ', '').replaceAll('R$', '');
}

function setReaisFormat(a) {
    return parseFloat(a).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function setReaisFormatNoRS(valor) {
    const formatted = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    return formatted.replaceAll('R$', '').trim();
}

/* function fromRealtoNumber(valor) {

    let aux = valor.replaceAll('R$', '');
    aux = aux.replaceAll('.', '');
    aux = aux.replaceAll(',', '.');
    aux = aux.replaceAll(' ', '');

    const isNegativo = valor.includes('-');
    aux = aux.replaceAll('-', '');
    if (isNegativo) {
        aux = parseFloat(aux) * -1;
    } else {
        aux = parseFloat(aux);
    }

    return aux;
} */

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

/* function fromNumberToReal(valor) {
    
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function fromNumberToRealNoRS(valor) {
    
    const formatted = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    return formatted.replaceAll('R$', '').trim();
} */

function fromNumberToDolar(valor) {

    const v = valor.toLocaleString("en-US", { style: "currency", currency: "USD" });
    return v.replaceAll('$', 'U$ ');
}

