class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            // Garantindo que seja enviado um cpf sem caracteres além de números
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    sequencia() {
        // Comparando os caracteres do cpf limpo e repetindo ele pelo tamanho da string
        // Resultando em uma sequência
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    gerarNovoCpf() {
        // Pegando o cpf sem os dois dígitos finais
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);

        // Criando os dois dígitos finais
        const digitoUm = this.gerarDigito(cpfSemDigitos);
        const digitoDois = this.gerarDigito(cpfSemDigitos + digitoUm);
        this.novoCpf = cpfSemDigitos + digitoUm + digitoDois;
    }

    gerarDigito(cpfSemDigitos) {
        let total = 0;
        let reverso = cpfSemDigitos.length + 1;

        for (let valorDigito of cpfSemDigitos) {
            total += reverso * Number(valorDigito);
            reverso--;
        }

        const digito = 11 - (total % 11);

        // Garantindo que o dígito retorne menor ou igual a 9
        return digito <= 9 ? String(digito) : '0';
    }

    valida() {
        // Verificando o cpf limpo
        if (!this.cpfLimpo) return false;
        // Verificando se retorna string
        if (typeof this.cpfLimpo !== 'string') return false;
        // Garantindo que retorne até 11
        if (this.cpfLimpo.length !== 11) return false;
        if (this.sequencia()) return;
        this.gerarNovoCpf();

        // Verificando a validade do cpf
        return this.novoCpf === this.cpfLimpo;
    }
}

/* Testando
let validaCpf = new ValidaCPF('070.987.720-03');

if (validaCpf.valida()) {
    console.log('CPF válido');
} else {
    console.log('CPF inválido');
}
*/