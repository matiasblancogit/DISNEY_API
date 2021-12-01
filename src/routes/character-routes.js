const { authJwt } = require("../middleware/authJwt");

const characterController = require("../controllers/character-controller");
const { Router } = require("express");
const router = Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

//router.get("/",[authJwt.verifyToken] ,characterController.getLastTenCharacters);
router.get("/" ,characterController.findAll);

router.get("/:oid", characterController.getCharacterById);

router.post("/",upload.single('image'), characterController.createCharacter);

router.post("/:oid",upload.single('image'), characterController.updateCharacter);

router.delete("/:oid",[authJwt.verifyToken], characterController.deleteCharacter);

router.get('/image/:imgName',characterController.getImageByName)



module.exports = router;