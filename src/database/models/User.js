const sequelize = require("../sequelize");
const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static associate(models) {
  
  }
}

User.init(
  {
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    validate: {
      notNull: {msg: "Por favor ingrese un nombre"},
      len: {msg: "Nombre de Usuario tiene que tener entre 8 y 50 caracteres",
            args: [8 , 50]},
      isAlphanumeric: {msg: "Por favor ingrese un nombre solo alfanumerico"}
    }},
    email: {
      type:DataTypes.STRING(50),
      unique: true,
      allowNull:false,
      validate:{
        isEmail:  {msg: "Por favor ingrese un email valido"},
        len: {msg: "El email tiene que tener entre 6 y 50 caracteres",
            args: [6 , 50]},
      }},
    password:
    { type: DataTypes.STRING(50),
      allowNull:false,
    validate: {
      is: /\$[a-z0-9-]+\$[0-9A-Za-z./+=,$-]+$/i
    }},
    isActive: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
  }
);

module.exports = User;
