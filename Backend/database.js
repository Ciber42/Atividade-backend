const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Listadetarefas', 'mysql', '123456', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.sync({ force: false }).then(() => {
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
});

module.exports = sequelize;
