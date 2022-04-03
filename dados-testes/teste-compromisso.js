

const compromissos = [
    { descricao: 'Conta de Energia', valor: 'R$ 100,00', vencimentoInicial: '01/01/2000', recorrencia: 'Mensal', qtdParcelas: '1', qtdParcelasASer: '1' },
    { descricao: 'Supermercado', valor: 'R$ 200,00', vencimentoInicial: '01/01/2000', recorrencia: 'Mensal', qtdParcelas: '2', qtdParcelasASer: '1' },
    { descricao: 'Gasolina', valor: 'R$ 300,00', vencimentoInicial: '01/01/2000', recorrencia: 'Mensal', qtdParcelas: '3', qtdParcelasASer: '1' },
    { descricao: 'Plano de Saúde', valor: 'R$ 400,00', vencimentoInicial: '01/01/2000', recorrencia: 'Mensal', qtdParcelas: '', qtdParcelasASer: '1' },
    { descricao: 'Escola', valor: 'R$ 500,00', vencimentoInicial: '01/01/2000', recorrencia: 'Mensal', qtdParcelas: '12', qtdParcelasASer: '1' },
    { descricao: 'Seguro', valor: 'R$ 600,00', vencimentoInicial: '01/01/2000', recorrencia: 'Mensal', qtdParcelas: '5', qtdParcelasASer: '1' }
]

function testeGetCompromissos() {
    return compromissos;
}