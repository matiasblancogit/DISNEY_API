'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Character.belongsToMany(models.Movie, {
        through: 'MovieCharacter',
        as: 'movie',
        foreignKey: 'characterId',
   
      });
    }
  };
  Character.init({
    id: {allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER(10)},
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    age: DataTypes.DECIMAL,
    history: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};