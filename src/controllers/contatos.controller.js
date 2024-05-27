const Contato = require('../models/contatos.model');

exports.index = (req, res) => {
    res.render('contatos', { contato: {} });
}

exports.cadastrar = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.create();

        if(contato.error.length > 0) {
            req.flash('error', contato.error);
            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }

        req.flash('sucess', 'Contato criado com sucesso');
        req.session.save(() => {
            return res.redirect(`/contatos/${contato.contato._id}`);
        });

    } catch {
        res.render('404');
    }
}

exports.editarIndex = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');

        const contato = await Contato.searchId(req.params.id);
    
        if(!contato) return res.render('404');
    
        res.render('contatos', { contato });
    } catch {
        res.render('404');
    }
}

exports.atualizar = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');

        const contato = new Contato(req.body);

        await contato.edit(req.params.id);

        if(contato.error.length > 0) {
            req.flash('error', contato.error);
            req.session.save(() => {
                return res.redirect(`/contatos/${contato.contato._id}`);
            });
            return;
        }

        req.flash('sucess', 'Contato atualizado com sucesso');
        req.session.save(() => {
            return res.redirect(`/contatos/${contato.contato._id}`);
        });

    } catch {
        res.render('404')
    }
}

exports.deletar = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404');
        console.log(req.params.id)
        const contato = await Contato.deletar(req.params.id);
    
        if(!contato) return res.render('404');
    
        req.flash('sucess', 'Contato deletado com sucesso');
        req.session.save(() => {
            return res.redirect('back');
        });
    } catch {
        res.render('404');
    }   
}