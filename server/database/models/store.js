const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database.js");

class Store extends Model {}

Store.init(
  {
    store_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "store",
  }
);

module.exports = Store;
