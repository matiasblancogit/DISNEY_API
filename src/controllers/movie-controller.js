const models = require( '../db/models/index');
const HttpError = require("../util/http-errors");
const Op = models.Sequelize.Op;

const Character=models.Character;
const Movie = models.Movie;
const MovieCharacter= models.MovieCharacter;
//const sequelize = require("../util/database");
const fs = require('fs')
var path = require('path');

const findAll = async (req, res, next) => {

  var condition = null;



  if ((req.query.title)&& (!req.query.genre) ){
    
    condition= { title: { [Op.like]: `%${req.query.title}%` } } ;
  }
  if ((req.query.title)&& (req.query.genre)){
      condition= {[Op.and]: [
      { title: { [Op.like]: `%${req.query.title}%` } },
      { genre:req.query.genre } 
    ]
  }
  } if ((!req.query.title)&& (req.query.genre)){
    condition= 
   
    { genre:req.query.genre } 
  

}



 
  var order="DESC";
  if(req.query.order){
    order=req.query.order
  }



  const movie = await Movie.findAll({
    attributes: ["title","image", "created_at"],
    where:condition,
    order: [["created_at", order]],
  });




  

  res.json({
    movie,
  });
};


const createMovie =  async (req, res, next) => {
  
  const {title, qualification,created_at,characters} = req.body;



   const createdMovie = await Movie.create({
     title,
     image: req.file.path,
     qualification,
     created_at,    
   })

   .then((createdMovie) => {
 console.log(characters);
    characters.forEach((item) => {


        const character =  Character.findByPk(item);
        if (!character) {
          return res.status(400);
        }
        
        
         const movieId= createdMovie.id;
         const characterId= item;
      
        
      
          savedMovieCharacter = MovieCharacter.create({movieId,characterId});
  })
  return res.status(200).json(createdMovie);


  })
  .catch((error) => res.status(404).json({ error }));






// If everything goes well, respond with the order




};

const updateMovie = async (req, res, next) => {
  const movieId = req.params.oid;
  const { image,title, qualification,created_at,GenreId} = req.body;
  const movieOld=await Movie.findByPk(movieId);
  movieOld instanceof Movie;
  filePath = path.join(__dirname, '../../'+movieOld.image);

  try {
    //listing messages in users mailbox 
    fs.unlinkSync(filePath)
    } catch (err) {
      res.status(404).json({
        ok: false,
        message: "No such file or directory to update",
      });
      
      
    }

  

  
  await Movie.update( {
    title,
    image: req.file.path,
    qualification,
    created_at, 
    GenreId   
  },
    { where: { id: movieId } })
  
     .then((code) => {
      
             if (code[0] === 0) {
         res.status(404).json({
           ok: false,
           message: "Couldn´t update the Movie, verify the id ",
         });
       } else {
         res.json({
           ok: true,
           message: "Movie updated succefully!",
         });
       }
     })
     .catch((error) => res.status(500).json({ error }));
};

const deleteMovie = async (req, res, next) => {
  const movieId = req.params.oid;

  await Movie.destroy({
    where: { id: movieId },
  })
    .then((code) => {
      if (code === 0) {
        res.status(404).json({
          ok: false,
          message: "Couldn´t delete the selected Movie, verify the id ",
        });
      } else {
        res.json({
          ok: true,
          message: "Movie deleted succefully!",
        });
      }
      console.log(code);
    })
    .catch((error) => {
      res.status(404).json({
        ok: false,
        error,
      });
    });
};



const getMovieById = async (req, res,next) =>{
  const movieId= req.params.oid;
  movie = await Movie.findByPk(movieId,{include:[{
    model:Character,
    as:"character",
    attributes: ["id", "name","image", "age", "history", "weight"]
  }]});

  if (!movie) {
    //throw new HttpError("Could not find any Movie", 404);
  }

  res.json({
    movie,
  });

}

const getImageByName =async (req,res,next) =>{
  const image=req.params.imgName;
  res.sendFile(__basedir +'/public/images/'+image);

}






exports.createMovie = createMovie;
exports.updateMovie = updateMovie;
exports.deleteMovie = deleteMovie;
exports.findAll = findAll;
exports.getMovieById=getMovieById;
exports.getImageByName=getImageByName;
