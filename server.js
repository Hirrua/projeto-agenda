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

// Recomendado pelo Express como uma boa prática de segurança (Cabeçalhos HTTP)
app.use(helmet());

// Tratar os POST que são requisitados
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conteúdo estático (bundle, imgs, etc) que pode ser acessado diretamente
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs'); // Engine que vai ser utilizado para criar os templates (HTML)

app.use(sessionOptions); // Configuração da sessão e salvando (cookie)
app.use(flash()); // Flash messages

app.use(csrf()); // Token para validar os formulários

// Aplicação utilizando os middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

// Utilizando as rotas que foram definidas
app.use(routes);

// Chamando a conexão com o banco
connection;

// Usa uma porta configurada no .env ou uma padrão (3000)
const porta = process.env.PORT || 3000;

// O servidor fica escutando as requisições que chegam da porta definida
app.listen(porta, () => {
  console.log('Acessar http://localhost:3000');
  console.log(`Servidor rodando na porta ${porta}`)
});
