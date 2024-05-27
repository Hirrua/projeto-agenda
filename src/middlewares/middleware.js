// Salvando localmente dados referente a uma requisição
exports.middlewareGlobal = (req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.sucess = req.flash('sucess');
  res.locals.user = req.session.user;
  next();
};

// Middleware para erro, renderizando uma página 404
exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }
  next();
};

// Validando os tokens
exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

// Validando se o usuário está logado no sistema
exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('error', 'Você precisa fazer login.');
    req.session.save(() => res.redirect('/')); // Sempre importante salvar a sessão, mesmo dando certo ou errado
    return;
  }
  next();
}