const sequelize = require('../sequelize');
const { Model , DataTypes } = require('sequelize');

class Gender extends Model{
    static associate(models){
        Gender.hasMany(models.Movie);
    }
}

Gender.init(
    {
        name: DataTypes.STRING(50),
        image: DataTypes.STRING(250),
},
{
    sequelize,
    modelName: "gender",
    tableName: "genders",
});

module.exports = Gender;