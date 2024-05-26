const Login = require('../models/login.model')

exports.index = (req, res) => {
    if(req.session.user) return res.redirect('/');
    return res.render('login');
};

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.authenticate();

        if(login.error.length > 0) {
            req.flash('error', login.error);

            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }

        req.flash('sucess', 'Logado com sucesso!');
        req.session.user = login.user;

        req.session.save(() => {
            return res.redirect('/');
        });

    } catch {
        return res.render('404');
    }
    
};

exports.registrar = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if(login.error.length > 0) {
            req.flash('error', login.error);

            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }

        req.flash('sucess', 'Usuário cadastrado com sucesso!');

        req.session.save(() => {
            return res.redirect('back');
        });

    } catch {
        return res.render('404');
    }
    
};

exports.sair = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}