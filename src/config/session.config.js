require('dotenv').config();

const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionOptions = session({
    secret: process.env.SECRETKEY,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    }
});

module.exports = sessionOptions;