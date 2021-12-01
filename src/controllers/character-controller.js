const HttpError = require("../util/http-errors");
const models = require( '../db/models/index');
const Op = models.Sequelize.Op;
const Character = models.Character;
const Movie=models.Movie;
const sequelize = require("../util/database");
const fs = require('fs')
var path = require('path');


const findAll = async (req, res, next) => {


  var condition = null;  
  var characters=null;
  if ((req.query.name)&& (!req.query.age) && (!req.query.weight)){
    
    condition= { name: { [Op.like]: `%${req.query.name}%` } } ;
  }
  if ((req.query.name)&& (req.query.age) && (!req.query.weight)){
      condition= {[Op.and]: [
      { name: { [Op.like]: `%${req.query.name}%` } },
      { age:req.query.age } 
    ]
  }
  }


  if ((req.query.name)&& (req.query.age) && (req.query.weight)){
    condition= {[Op.and]: [
    { name: { [Op.like]: `%${req.query.name}%` } },
    { age:req.query.age }, 
    { weight:req.query.weight } 
  ]
}
}


if((req.query.movie)){

  characters= await Character.findAll({
    attributes: ["id","name","image", "age"],
    where:condition,
    include: [{
      model: Movie,
      where:{title:req.query.movie},
      as:'movie'
     }]
    });
}else{
  characters = await Character.findAll({
    attributes: ["id","name","image", "age"],
    where:condition
    });

}





  if (!characters) {
    //throw new HttpError("Could not find any character", 404);
  }

  res.json({
    characters,
  });
};


const createCharacter = async (req, res, next) => {
  const { image,name, age, weight, history } = req.body;

  const createdCharacter = await Character.create({
    name,
    image: req.file.path,
    age,
    weight,
    history,
  })
    .then((createdCharacter) => {
      res.json({
        ok: true,
        createdCharacter,
      });
    })
    .catch((error) => res.status(404).json({ error }));
};

const updateCharacter = async (req, res, next) => {
  const characterId = req.params.oid;
  const { image, age, weight, history } = req.body;
  const characterOld= await Character.findByPk(characterId);
  characterOld instanceof Character;
  filePath = path.join(__dirname, '../../'+characterOld.image);
  try {
    //listing messages in users mailbox 
    fs.unlinkSync(filePath)
    } catch (err) {
      res.status(404).json({
        ok: false,
        message: "No such file or directory to update",
      });
      
      
    }



  await Character.update(
    {
      image:req.file.path,
      age,
      weight,
      history
    },
    { where: { id: characterId } }
  )
    .then((code) => {
      if (code[0] === 0) {
        res.status(404).json({
          ok: false,
          message: "Couldn´t update the Character, verify the id ",
        });
      } else {
        res.json({
          ok: true,
          message: "Character updated succefully!",
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteCharacter = async (req, res, next) => {
  const characterId = req.params.oid;

  await Character.destroy({
    where: { id: characterId },
  })
    .then((code) => {
      if (code === 0) {
        res.status(404).json({
          ok: false,
          message: "Couldn´t delete the selected Character, verify the id ",
        });
      } else {
        res.json({
          ok: true,
          message: "Character deleted succefully!",
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



const getCharacterById = async (req, res,next) =>{
  const characterId= req.params.oid;
  character = await Character.findByPk(characterId,{include:[{
    model:Movie,
    as:"movie",
    attributes: ["image","title", "qualification","created_at"]
  }]}).then(()=>{

      
      
      
      res.status(200).json({
      character
            });

  }) .catch((error) => {
    res.status(404).json({
      message:"The task with the provided ID does not exist."
      
    });
  });






}

const getImageByName =async (req,res,next) =>{
  const image=req.params.imgName;
  res.sendFile(__basedir +'/public/images/'+image);

}





// exports.findAll = (req, res) => {
//   const title = req.query.title;
//   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

//   Tutorial.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };





exports.createCharacter = createCharacter;
exports.updateCharacter = updateCharacter;
exports.deleteCharacter = deleteCharacter;
exports.findAll = findAll;
exports.getCharacterById=getCharacterById;
exports.getImageByName=getImageByName;

