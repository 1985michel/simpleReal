

function fromRealtoNumber(valor) {

    let aux = valor.slice(3,);
    aux = aux.replaceAll('.', '');
    aux = aux.replaceAll(',', '.');

    return parseFloat(aux);
}