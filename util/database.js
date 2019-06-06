const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'test', 'test', {
  dialect: 'mysql',
  host: 'localhost',
  port: 4406
});

module.exports = sequelize;