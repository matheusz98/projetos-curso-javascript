const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

// Middleware de login requerido
const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index);

// Rota de login
route.get('/login/', loginController.index);

// Rota de cadastro
route.post('/login/register', loginController.register);

// Rota de login
route.post('/login/login', loginController.login);

// Rota de logout
route.get('/login/logout', loginController.logout);

// Rota de contato
route.get('/contato/', loginRequired, contatoController.index);

// Rota de registrar contato
route.post('/contato/register', loginRequired, contatoController.register);

// Rota de edição do contato
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);

// Rota de editar infos
route.post('/contato/edit/:id', loginRequired, contatoController.edit);

// Rota de deletar contato
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

module.exports = route;