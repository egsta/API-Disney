const express = require("express");
const { models }= require("../database/models/models");
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const checkJwt = require("../middlewares/jwt");
const { checkSchemaLogin } = require('../middlewares/validator/schemaValidator')

const model = models.User;

router.get("/", checkJwt,  (req, res) => {
    console.log("login")
    //res.send("estamos en Login")
     model.findAll().then((list) => {
       res.json(list);
     });
  });
  
 
   router.post('/',checkSchemaLogin,  async(req,res,next)=>{
   const user = await model.findOne({ where : {email : req.body.email }});
   if(user){
      const password_valid = await bcrypt.compare(req.body.password,user.password);
      if(password_valid){
          token = jwt.sign({ "id" : user.id,"email" : user.email,"userName":user.userName },process.env.SECRET, { expiresIn: '1h' }); res.status(200).json({ token : token });
      } else {
        res.status(400).json({ error : "Password Incorrect" });
      }
    
    }else{
      res.status(404).json({ error : "User does not exist" });
    }
    
    });

module.exports = router;