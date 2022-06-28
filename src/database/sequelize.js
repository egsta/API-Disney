const { Sequelize } = require("sequelize");
const { sqlite } = require('./config');

const sequelize = new Sequelize(sqlite.db);

module.exports = sequelize;
