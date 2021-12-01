const { verifySignUp } = require("../middleware/verify-signup");
const authController = require("../controllers/auth-controller");
const { Router } = require("express");
const router = Router();
const { body, validationResult } = require('express-validator');


router.post(
    "/signup", body('email').isEmail(),
   
    [
      verifySignUp.checkDuplicateUsernameOrEmail,

    ],
    authController.signup
  );
  router.post("/signin", authController.signin);

module.exports = router;