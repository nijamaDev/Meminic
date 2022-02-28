const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database.js");

class Product extends Model {}

Product.init(
  {
    idKardex: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    reference: DataTypes.STRING,
    productName: DataTypes.STRING,
    location: DataTypes.STRING,
    supplier: DataTypes.STRING,
    minimumAmount: DataTypes.INTEGER,
    maximumAmount: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "product",
  }
);

module.exports = Product;
