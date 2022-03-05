<div style="margin: auto; width: 50%; padding: 10px">
<h1>Template - NestJS with MongoDB</h1>
<p>Template para aplicações desenvolvidas em NestJS com MongoDB </p>
</div>

## Instalação

Faça uma cópia do arquivo `.env.exampe` chamada `.env` e preencha as variáveis de acordo com a sua preferência. Exemplo:

```
# PORT
# description: application listening port
# example: 3000
PORT=3000

# ENV
# description: application environment
# example: dev, test, prod
ENV=dev

# DATABASE_URL
# description: full url from database
# example: mongodb://<user>:<pwd>@<host>:<port>/database
DATABASE_URL=mongodb://localhost:27017/template-nest-with-mongodb

# TEST_DATABASE_URL
# description: full url from test database
# example: mongodb://<user>:<pwd>@<host>:<port>/database
TEST_DATABASE_URL=mongodb://localhost:27017/template-nest-with-mongodb-test

```

Após isso, instale as dependências do projeto:

```bash
$ npm install
```

## Executando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Executando os testes

```bash
# all tests
npm run test

# unit tests
$ npm run test:unit

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Autor

- [Lucas Rocha](https://github.com/lucasrochagit) - Projeto Inicial