const { authJwt } = require("../middleware/authJwt");

const movieController = require("../controllers/movie-controller");
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

router.get("/" ,movieController.findAll);

router.get("/:oid", movieController.getMovieById);

router.post("/",upload.single('image'), movieController.createMovie);

router.post("/:oid",upload.single('image'), movieController.updateMovie);

router.delete("/:oid", movieController.deleteMovie);

router.get('/image/:imgName',movieController.getImageByName)

module.exports = router;