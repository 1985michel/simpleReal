"use strict";



/*
- Uma entrada é um ganho financeiro - salário, dividendo, rendimentos, etc.
- Uma entrada precisa estar associada a um conta - o dinheiro tem que ir a algum lugar, nem que seja carteira física
- Um conta pode ter várias entradas, mas uma entrada só pode ter uma conta - (se for dividir, divida o valor pelas contas envolvidas)

??? Questões:
1 - Ao registrar uma entrada, o saldo da conta será atualizado automaticamente?
    - se sim:
        - é bom pois o saldo já se atualiza não sendo necessário entrar na conta e registrar o valor
    - se não: <<< Tendência inicial para fins de simplificação!
        - é bom pois evita geração de saldos irreais
            - ex.: o cara já atualizou o saldo da conta, daí depois vai e registra uma entrada. Ao fazer isso ele estaria adicionando
            uma entrada que já havia sido computada.
        - outra questão é que se o saldo não for somado, eu não preciso nem me preocupar em controlar em qual conta o entrada vai, não importa.
*/

class Entrada {
    constructor(descricao, valor, nota, previsaoRecebimento, isRecebido) {
        this.descricao = descricao.slice();
        this.valor = valor; //TODO tratar para aceitar somente valores positivos
        this.nota = nota.slice();
        this.previsaoRecebimento = new Momento(previsaoRecebimento.data, previsaoRecebimento.hora);
        this.isRecebido = isRecebido;
    }

    getDescricao() {
        return this.descricao.slice();
    }

    getValor() {
        return this.valor;
    }

    getNota() {
        return this.nota.slice();
    }

    getPrevisaoRecebimento() {
        return this.previsaoRecebimento;
    }

    getIsRecebido() {
        return this.isRecebido;
    }

    setDescricao(descricao) {
        this.descricao = descricao.slice();
    }

    setValor(valor) {
        this.valor = valor; //TODO tratar pois tem que ser positivo
    }

    setNota(nota) {
        this.nota = nota.slice();
    }

    setPrevisaoRecebimento(previsaoRecebimento) {
        this.previsaoRecebimento = new Momento(previsaoRecebimento.data, previsaoRecebimento.hora);
    }

    setIsRecebido(isRecebido) {
        this.isRecebido = isRecebido;
    }


}