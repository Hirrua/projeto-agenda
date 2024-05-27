const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.users = null;
    this.error = [];
  }

  async authenticate() {
    this.valida();
    if(this.error.length > 0) return;

    this.user = await LoginModel.findOne({ email: this.body.email });

    if(!this.user) {
      this.error.push('Usuário ou senha inválido!');
      return;
    }

    // Valida a senha com o hash da senha salva no banco
    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.error.push('Usuário ou senha inválido!');
      this.user = null;
      return;
    }
  }

  async register() {
    this.valida();
    if(this.error.length > 0) return;

    await this.userExists();

    if(this.error.length > 0) return;

    // "Criptografa" a senha, transformando em um hash
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    
    // Salva no banco
    this.user = await LoginModel.create(this.body);
    
  }

  async userExists() {
    // Busca no banco se aquele email já foi cadastrado
    const user = await LoginModel.findOne({ email: this.body.email });

    if(user) {
      this.error.push('Usuário já existe!')
    }
  }

  valida() {
    this.cleanUp();

    // Uma biblioteca que valida se aquilo realmente é um email
    if(!validator.isEmail(this.body.email)) {
      this.error.push('E-mail inválido');
    }

    if(this.body.password.length < 3 || this.body.password.length > 20) {
      this.error.push('A senha precisa ter 3 a 20 caracteres');
    } 
  }

  cleanUp() {
    // Limpa os campos, garantindo que só possua strings
    for(let key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    };

  }
}

module.exports = Login;
