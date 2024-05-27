require('dotenv').config(); // Uma forma de ocultar as informações sensiveis, assim cada um podendo configurar da sua maneira
const mongoose = require('mongoose'); // Mongoose pra fazer a conexão com mongodb

mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o banco de dados:'));
db.once('open', function() {
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
});

module.exports = db;