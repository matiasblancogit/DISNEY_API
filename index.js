require("dotenv").config();
const helmet = require("helmet");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const sequelize = require("./src/util/database");

const characterRoutes = require("./src/routes/character-routes");

const movieRoutes = require("./src/routes/movie-routes");
const authRoutes = require("./src/routes/auth-routes");
app.use(express.json({extended: false}));
// parse requests of content-type - application/json

//HELMET 


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});



app.use("/api/characters", characterRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes)

/* Utilizamos el puerto configurado en nuestra variable de entorno
y sincronizamos la base de datos con el metodo de sequelize sync */

app.listen(process.env.PORT, function () {
  sequelize
    .sync()
    .then(() => {
      console.log("We´re connected to the database");
      console.log("Running on port: " + process.env.PORT);
    })
    .catch((error) => {
      console.log("An error ocurred", error);
    });
});
module.exports = app;