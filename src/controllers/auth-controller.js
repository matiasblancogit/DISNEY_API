const models = require( '../db/models/index');
const User =models.User
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { body, validationResult } = require('express-validator');
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const signup = async (req, res, next) => {

    const {username,email,password} = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }




    const createdUser= await User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 8)
      })
      .then((createdUser) => {
        console.log(email);
        const msg = {
          to: email, // Change to your recipient
          from: 'sm.blanco@hotmail.com', // Change to your verified sender
          subject: 'Sending with SendGrid is Fun',
          templateId: '71d2246d-6d9b-424e-be41-ca9114b6eebc',
          substitutions: {
            name: username,           
          },
        }
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent')
          })
          .catch((error) => {
            res.status(404).json({ error });
          })

        res.json({
          ok: true,
          createdUser,
        });
      })
      .catch((error) => res.status(404).json({ error }));
  };


 
  
const signin = async (req, res, next) => {
   
    User.findOne({
        where: {
          username: req.body.username
        }
      })
        .then(user => {
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
    
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
    
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }
    
          var token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
            expiresIn: 86400 // 24 hours
          });
          
          const date = new Date();
          date.setDate(date.getDate() + 10);
    console.log("Expiry :"+date.getTime());
        
            
          res.status(200).send({
            id: user.id,
            user: user.username,
            email: user.email,       
            accessToken: token,
            expiryDate:date.getTime()
            
           
           
          });
          
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
 
  };

   

exports.signin=signin;
exports.signup=signup;