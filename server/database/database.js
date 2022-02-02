const { Sequelize } = require("sequelize");
const { keys } = require("../config/keys");

const sequelize = new Sequelize(keys.DATABASE, keys.USERDB, keys.PASSWORD, {
  host: keys.HOST,
  dialect: "postgres",
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
