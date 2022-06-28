const sequelize = require("../sequelize");
const { Model, DataTypes } = require("sequelize");

class Movie extends Model {
  static associate(models) {
    Movie.belongsToMany(models.Character, {through: models.CharacterMovie,  as: 'characters'});
    Movie.belongsTo(models.Gender);
  }
}

Movie.init(
  {
    image: DataTypes.STRING(250),
    name: DataTypes.STRING(100),
    qualification: DataTypes.INTEGER(11),
    createdDate: DataTypes.DATE
  },
  {
    sequelize,
    modelName: "movie",
    tableName: "movies",
  }
);


module.exports = Movie;