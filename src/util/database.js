require("dotenv").config();

const Sequelize = require("sequelize");

//Configuramos la base de datos, nombre, usuario y contraseña

const sequelize = new Sequelize(
  process.env.NAME_DB,
  process.env.USER_DB,
  process.env.PASSWORD_DB,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

//Exportamos la configuración para utilizarla en distintas ubicaciones
module.exports = sequelize;