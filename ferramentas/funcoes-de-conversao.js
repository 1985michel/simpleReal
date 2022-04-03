

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

function fromNumberToReal(valor) {
    /* let aux = `${valor}`;

    aux = aux.replaceAll('.', ',');



    return `${valor < 0 ? '-' : ''} R$ ` */
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}