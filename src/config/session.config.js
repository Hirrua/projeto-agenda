require('dotenv').config();

const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionOptions = session({
    secret: process.env.SECRETKEY, // Chave secreta pra sessão
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }), // Local onde será armazenada
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // Tempo em que será armazenada o cookie do usuário
      httpOnly: true
    }
});

module.exports = sessionOptions;