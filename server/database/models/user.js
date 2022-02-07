const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database.js");

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    role: DataTypes.STRING,
    state: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "user",
  }
);

module.exports = User;