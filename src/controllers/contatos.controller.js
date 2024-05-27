const Contato = require('../models/contatos.model');

exports.index = (req, res) => {
    res.render('contatos', { contato: {} }); // Envia um contato vazio
}

exports.cadastrar = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.create();

        if(contato.error.length > 0) {
            req.flash('error', contato.error);
            req.session.save(() => {
                return res.redirect('back'); // Caso de erro, retorna a pagina anterior
            });
            return;
        }

        req.flash('sucess', 'Contato criado com sucesso'); // Mostra a mensagem de erro
        req.session.save(() => { // Salva a sessão
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
        if(!req.params.id) return res.render('404'); // Se não passar nenhum parametro, renderiza a pagina de erro

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