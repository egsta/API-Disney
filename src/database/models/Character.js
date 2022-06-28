const sequelize = require("../sequelize");
const { Model, DataTypes } = require("sequelize");

class Character extends Model {
  static associate(models) {
    Character.belongsToMany(models.Movie, {
      through: models.CharacterMovie,
      as: "movies",
    });
  }
}

Character.init(
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: "Por favor ingrese un nombre" },
        len: {
          msg: "Nombre del personaje tiene que tener entre 2 y 50 caracteres",
          args: [2, 50],
        },
        isAlphanumeric: {
          msg: "Por favor ingrese un nombre solo alfanumerico",
        },
      },
    },
    image: {
      type: DataTypes.STRING(250),
      allowNull: false,
      validate: {
        notNull: { msg: "Por favor ingrese una Url para la imagen" },
        isUrl: { msg: "Ingrese una Url valida para la imagen" },
        len: {
          msg: "la Url tiene que tener entre 6 y 250 caracteres",
          args: [6, 250],
        },
      },
    },
    age: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      validate: {
        notNull: { msg: "Por favor ingrese la edad" },
        isNumeric: { msg: "Solo puede ingresar números" },
        min: { msg: "Si no llega al año ingrese 0" ,args: [0]},
        max: {
          msg: "No creemos que se pueda vivir mas de mil años, la edad debe ser menor",
        
        args: [1000]},
       // isDecimal: { msg: "Tiene que ingresar un edad en enteros" },
      },
    },
    weight: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      validate: {
        notNull: { msg: "Por favor ingrese el peso" },
        isNumeric: { msg: "Solo puede ingresar números" },
        min: { msg: "Si no llega al kilo ingrese 0" ,
                args: [0]},
        max: {
          msg: "No creemos que se pueda pesar mas de Diez Mil kilos, el peso debe ser menor",
        
        args: [10000]},
        isDecimal: { msg: "Tiene que ingresar un peso en enteros" },
      },
    },
    history: {
      type: DataTypes.TEXT(),
      allowNull: false,
      validate: {
        notNull: { msg: "Por favor ingrese la  historia del personaje" },
        max: { msg: "Solo tiene 1000 caracteres para la historia" ,
        args: [1000]},
      },
    },
  },
  {
    sequelize,
    modelName: "character",
    tableName: "characters",
  }
);

module.exports = Character;
