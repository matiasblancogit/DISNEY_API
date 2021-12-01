'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Genre.hasMany(models.Movie, {
        foreignKey: 'id'
      });
    }
  };
  Genre.init({
    id:{allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER(10)},
    description_txt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};