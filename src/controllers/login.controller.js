const Login = require('../models/login.model')

exports.index = (req, res) => {
    res.render('login');
};

exports.login = (req, res) => {
    const login = new Login(req.body);
    //login.authenticate();
    res.send(req.body);
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