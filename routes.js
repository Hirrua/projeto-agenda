const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/home.controller');
const loginController = require('./src/controllers/login.controller');
const contatosController = require('./src/controllers/contatos.controller');

// Um middleware para validar se aquele usuário está logado
const { loginRequired } = require('./src/middlewares/middleware');

// Rota Home
route.get('/', homeController.index);

// Rota Login e Cadastro
route.get('/login', loginController.index);
route.post('/login/entrar', loginController.login);
route.post('/login/registrar', loginController.registrar);
route.get('/login/sair', loginController.sair);

// Rota CRUD dos contatos
route.get('/contatos', loginRequired, contatosController.index);
route.post('/contatos/cadastrar', loginRequired, contatosController.cadastrar);
route.get('/contatos/:id', loginRequired, contatosController.editarIndex);
route.post('/contatos/atualizar/:id', loginRequired, contatosController.atualizar);
route.get('/contatos/deletar/:id', loginRequired, contatosController.deletar);

module.exports = route;