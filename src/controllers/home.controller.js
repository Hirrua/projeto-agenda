const Contato = require('../models/contatos.model');

exports.index = async (req, res) => {
  const contatos = await Contato.buscaContato();
  res.render('index', { contatos });
};
