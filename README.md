# Projeto Agenda de Contatos

> Projeto utilizando arquitetura MVC (Model View Controller)

Esse projeto conta com renderização server-side com EJS para criação dos templates e ser possível usar javascript incorporado no HTML, trata-se de um projeto voltado para backend, onde é possível criar usuário, logar e realizar operações de CRUD dos contatos, podendo salvar o nome, sobrenome, email e telefone de quem você quiser!

## Principais tecnologias

- NodeJS
- MongoDB
- EJS
- Express
- Bootstrap

## O que vai encontrar

- CSRF para segurança nos formulário na geração de tokens
- Helmet, recomendado pelo Express, para proteger o cabeçalho HTTP
- Mongoose para se conectar com o MongoDB
- Middlewares para erros, token csrf e verificação se usuário está logado
- Express-session para criar e salvar as sessões e assim podendo salvar os cookies daquele usuário, mantendo logado, etc
- Flash messages para gerenciar as mensagens de sucesso e erro
- Model para criação do Schema para o login/cadastro e contatos
- EJS para renderização ao lado do servidor