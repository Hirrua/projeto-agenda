const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/home.controller');
const loginController = require('./src/controllers/login.controller');

route.get('/', homeController.index);

route.get('/login', loginController.index);
route.post('/login/entrar', loginController.login);
route.post('/login/registrar', loginController.registrar);
route.get('/login/sair', loginController.sair);

module.exports = route;
  