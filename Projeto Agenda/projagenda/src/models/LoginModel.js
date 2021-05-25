const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

// Pegando os dados do form no loginController
class Login {
    constructor(body) {
        this.body = body;
        // Flag de erros
        this.errors = [];
        this.user = null;
    }

    // Método para logar o usuário
    async login() {
        this.valida();
        if(this.errors.length > 0) return;

        // Validando e verificando se o usuário existe
        this.user = await LoginModel.findOne({ email: this.body.email });
        
        // Verificando se existe ou não
        if(!this.user) {
            this.errors.push('Usuário não existe.');
            return;
        }

        // Comparando os dados do banco e form
        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }
    }

    // Método para registrar o usuário
    async register() {
        this.valida();

        // Se o array de erros tiver pelo menos 1 valor, preencha a variável user caso for necessário pegar algum valor
        if(this.errors.length > 0) return;

        await this.userExists();

        if(this.errors.length > 0) return;

        // Gerando um salt e fazendo hash da senha para proteger os dados
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        // try catch para tratar erros
        try {
            this.user = await LoginModel.create(this.body);
        } catch(e) {
            console.log(e);
        }
    }

    // Método para checar se o usuário já existe
    async userExists() {
        // Procurando no banco o email cadastrado e o email inserido no form
        this.user = await LoginModel.findOne({ email: this.body.email });
        if(this.user) this.errors.push('Usuário já existe.');
    }

    // Validando login
    valida() {
        this.cleanUp();

        // Validando o email
        // Se NÃO for um email válido, mostra um erro
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        // Validando a senha
        if(this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
        }
    }

    // Método para rodar um for nas chaves do body (form) e garantir que tudo seja string
    cleanUp() {
        for(const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                // Se tiver algo que não é uma string, converte pra uma string vazia
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login;