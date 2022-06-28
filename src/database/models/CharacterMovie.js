const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

class CharacterMovie extends Model {
    static associate(models) {}
}

CharacterMovie.init({
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }
}, {
    sequelize,
    timestamps: false,
    tableName: "charactersMovie",
    modelName: "characterMovie",
});

module.exports = CharacterMovie