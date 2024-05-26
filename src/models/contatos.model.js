const mongoose = require('mongoose');
const { awrap } = require('regenerator-runtime');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.contato = null;
        this.error = [];
    }

    async create() {
        this.valida();
        if(this.error.length > 0) return;

        this.contato = await ContatoModel.create(this.body);
    }

    async edit(id) {
      if(typeof id !== 'string') return;

      this.valida();
      if(this.error.length > 0) return;

      this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });

    }

    static async searchId(id) {
      if(typeof id !== 'string') return;
      const contato = await ContatoModel.findById(id);
      return contato;
    }

    valida() {
        this.cleanUp();
    
        if(this.body.email && !validator.isEmail(this.body.email)) {
          this.error.push('E-mail inválido');
        }
    
        if(!this.body.nome) {
            this.error.push('É necessário informar um nome')
        }

        if(!this.body.email && !this.body.telefone) {
            this.error.push('Pelo menos uma forma de contato precisa ser salvo')
        }
        
      }
    
      cleanUp() {
        for(let key in this.body) {
          if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
          }
        }
    
        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        };
    }
}

module.exports = Contato;