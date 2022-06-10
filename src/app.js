require('dotenv').config({
    path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
});

const express = require('express');

class AppController {
    constructor() {
        this.express = express();   //instanciando o express --> famoso 'app'
        this.middlewares();  // iniciando automaticamente
        this.routes();      //  essas funções para usar as rotas e os middlewares
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.use(require('./routes'));
    }
}

module.exports = new AppController().express;