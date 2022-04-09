



function getDataAtual() {
    const hoje = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10);
    return hoje;
}

function getHoraAtual() {
    const data = new Date();
    const hora = data.getHours();          // 0-23
    const min = data.getMinutes();        // 0-59
    const seg = data.getSeconds();        // 0-59


    return `${hora}:${min}:${seg}`;
}



function getDataAtualFormatada() {

    const [year, month, day] = getDataAtual().split('-');
    return `${day}/${month}/${year}`;
}

function formataData(data) {

    const [year, month, day] = data.split('-')
    return `${day}/${month}/${year}`
}


function parseToDate(date) {
    if (!date) return null


    const [day, month, year] = date.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

function isDataABeforDataB(a, b) {

    //retorn false: se A posterior a B
    //retorna -1 se forem iguais
    //retorna trua se A anterior a B

    //console.log(`Vamos comparar ${a} e ${b}`);

    const [dayA, monthA, yearA] = a.split('/');

    const [dayB, monthB, yearB] = b.split('/');

    if (yearA < yearB) {
        return true;
    } else if (yearA == yearB) {
        if (monthA < monthB) {
            return true;
        } else if (monthA == monthB) {
            if (dayA < dayB) {
                return true;
            } else if (dayA > dayB) {
                return false;
            }
            else {
                return -1; // o que significa que são datas iguais
            }
        } else {
            return false;
        }
    } else {
        return false;
    }

}


function addDias(data, days) {

    //days = days + 1;

    //console.log(`ADD DIAS: chegou ${data} para somar ${days}`);

    data = parseToDate(data);

    let result = new Date(data);


    //esse é o pulo do gato. Sem ele não funciona.
    result.setHours(result.getHours() + 24);

    result.setDate(result.getDate() + days);

    result = formataData((new Date(result - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10));


    // console.log(`ADD DIAS RETORNA ${result}`);

    return result;
}

function addMeses(data, meses) {

    //console.log(`Em addMeses recebemos ${data}`);

    const [day, month, year] = data.split('/')

    if (month == '02') {
        //para fevereiro ele tenta descontar os dois dias a menos, então tenho que pular isso.
        data = `${day}/03/${year}`;
    }


    data = parseToDate(data);

    let result = new Date(data);

    //esse é o pulo do gato. Sem ele não funciona. E tem que ser antes de somar os meses.
    result.setHours(result.getHours() + 24);

    if (month != '02') {
        result.setMonth(result.getMonth() + meses);
    }

    //result = `${result.}/${result.getMonth()}/${result.getFullYear()}`;
    result = formataData((new Date(result - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10));

    //console.log(`Em addMeses estamos retornando ${result}`);
    return result;
}