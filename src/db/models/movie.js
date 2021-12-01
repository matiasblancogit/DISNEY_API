'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsToMany(models.Character, {
        through: 'MovieCharacter',
        as: 'character',
        foreignKey: 'movieId',
       
      });
      Movie.belongsTo(models.Genre);
    }
  };
  Movie.init({
    id: {allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER(10)},
    title: DataTypes.STRING,
    created_at: DataTypes.DATE,
    qualification: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    GenreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};