const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database.js");

class Movements extends Model {}

Movements.init(
  {
    id_movement: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    date: DataTypes.DATEONLY,
    accSupport: DataTypes.STRING,
    movementType: DataTypes.STRING,
    unitValue: DataTypes.DOUBLE,
    weightedValue: DataTypes.DOUBLE,
    inputAmount: DataTypes.DOUBLE,
    inputValue: DataTypes.DOUBLE,
    outputAmount: DataTypes.DOUBLE,
    outputValue: DataTypes.DOUBLE,
    balanceAmount: DataTypes.DOUBLE,
    balanceValue: DataTypes.DOUBLE,
  },
  {
    sequelize,
    modelName: "movements",
  }
);

module.exports = Movements;
