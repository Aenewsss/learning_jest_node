require('dotenv').config({
  path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
});

module.exports = { 
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'postgres',    
  storage: './__tests__/database.sqlite',
  operatorsAliases: 0,
  logging: false,         //não fica mostrando logs nas migrations
  define: {   
    timestamps: true,       //toda tabela criada no banco tem o campo created_at e updated_at
    underscored: true,      // tabelas criadas com a formatação underscore
    underscoredAll: true    //todos os itens das tabelas com a formatação
  },
};