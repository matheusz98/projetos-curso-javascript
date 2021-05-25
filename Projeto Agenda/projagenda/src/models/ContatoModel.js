const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    // Sobrenome não é obrigatório saber, caso estiver vazio ele recebe uma string vazia por padrão
    sobrenome: { type: String, required: false, default: ''},
    email: { type: String, required: false, default: ''},
    telefone: { type: String, required: false, default: ''},
    // Data em que o contato foi criada
    criadoEm: { type: Date, default: Date.now},
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.prototype.register = async function() {
    this.valida();

    if(this.errors.length > 0) return;
    // Quando for criado no banco vai retornar pra variável contato
    this.contato = await ContatoModel.create(this.body);
}

Contato.prototype.valida = function() {
    this.cleanUp();

    // Caso for encontrado algum valor no email, valida. Caso contrário, passa adiante 
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
    if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
    // Se não for enviado o email e o telefone, dá um erro
    // Precisa ser pelo menos um dos dois
    if(!this.body.email && !this.body.telefone) {
        this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
    }
};

Contato.prototype.cleanUp = function() {
    for(const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
    };
};

Contato.prototype.edit = async function(id) {
    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;
    // Encontrando por id e atualizando seus dados
    // Quando for atualizado, retorna os dados atualizados
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
};

// Métodos estáticos
// Função de busca pelo id do contato
Contato.buscaPorId = async function(id) {
    // Checando se o id é uma string
    if(typeof id !== 'string') return;

    const contato = await ContatoModel.findById(id);
    return contato;
};

// Chamando de maneira decrescente
    // 1- = Crescente
    // -1 = Decrescente
Contato.buscaContatos = async function() {
    const contatos = await ContatoModel.find()
        .sort({ criadoEm: -1});
    return contatos;
};

Contato.delete = async function(id) {
    if(typeof id !== 'string') return;
    // Encontre um e apague
    const contato = await ContatoModel.findOneAndDelete({_id: id});
    return contato;
};

module.exports = Contato;