class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        // Evento de submit
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        // Evitando o envio do form
        e.preventDefault();
        const camposValidos = this.checarCampos();
        const emailsValidos = this.checarEmails();
        const senhasValidas = this.checarSenhas();
        
        // Verificando se todos os campos estão preenchidos
        if (camposValidos && emailsValidos && senhasValidas) {
            alert('Cadastro realizado com sucesso!');
            this.formulario.submit();
        }
    }

    checarEmails() {
        let emailValido = true;
        
        const email = this.formulario.querySelector('.email');
        const repetirEmail = this.formulario.querySelector('.repetir-email');

        if (email.value !== repetirEmail.value) {
            this.exibirErro(email, 'Campos email e repetir email precisam ser iguais.');
            this.exibirErro(repetirEmail, 'Campos email e repetir email precisam ser iguais.')
            emailValido = false;
        }
        return emailValido;
    }

    checarSenhas() {
        let senhaValida = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        if (senha.value !== repetirSenha.value) {
            this.exibirErro(senha, 'Os campos senha e repetir senha precisam ser iguais.');
            this.exibirErro(repetirSenha, 'Os campos senha e repetir senha precisam ser iguais.');
            senhaValida = false;
        }

        if (senha.value.length < 8) {
            this.exibirErro(senha, 'A senha precisa ter pelo menos 8 caracteres.');
            senhaValida = false;
        }
        return senhaValida;
    }

    checarCampos() {
        let valido = true;

        // Evitando a repetição das mensagens de erro
        for (let msgErro of this.formulario.querySelectorAll('.msg-erro')) {
            msgErro.remove();
        }

        // Percorrendo os campos e validando
        for (let campo of this.formulario.querySelectorAll('.validar')) {
            // Colocando as mensagens de erro nos labels
            const label = campo.previousElementSibling.innerHTML;

            if (!campo.value) {
                this.exibirErro(campo, `Campo "${label}" não pode estar vazio.`);
                valido = false;
            }

            if (campo.classList.contains('cpf')) {
                if (!this.validaCpf(campo)) valido = false;
            }
        }
        return valido;
    }

    validaCpf(campo) {
        // Classe ValidaCPF do script cpf
        const cpf = new ValidaCPF(campo.value);

        if (!cpf.valida()) {
            this.exibirErro(campo, 'CPF inválido.');
            return false;
        }
        return true;
    }

    exibirErro(campo, msg) {
        // Criando a div com a mensagem de erro
        const div = document.createElement('div');
        div.innerHTML = msg;
        // Classe css da mensagem de erro
        div.classList.add('msg-erro');
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();