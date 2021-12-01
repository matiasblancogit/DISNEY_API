'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieCharacter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MovieCharacter.init({
    id: {allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER(10)},
    characterId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MovieCharacter',
  });
  return MovieCharacter;
};