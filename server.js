const express = require('express');
const app = express();
const connection = require('./src/config/database.config');
const sessionOptions = require('./src/config/session.config');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

connection;

const porta = process.env.PORT || 3000;

app.listen(porta, () => {
  console.log('Acessar http://localhost:3000');
  console.log(`Servidor rodando na porta ${porta}`)
});
