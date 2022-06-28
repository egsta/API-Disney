const express = require("express");
const { models }  = require('../database/models/models');
const bcrypt = require("bcrypt");
const sendMail = require('../middlewares/mailer');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { validateRegister } = require('../middlewares/validator/authVal')
const { checkSchemaRegister } = require('../middlewares/validator/schemaValidator')

const model = models.User;
  
  router.post('/', [checkSchemaRegister, validateRegister], async(req, res, next)=>{
   
    const salt = await bcrypt.genSalt(10);
    let usr = {
      userName : req.body.userName == '' ? null : req.body.userName,
      email : req.body.email == '' ? null : req.body.email,
      password : await bcrypt.hash(req.body.password, salt)
    };
   
    model.create(usr).then(user => {
      const token = jwt.sign({ "id" : user.id,"email" : user.email,"userName":user.userName },process.env.SECRET)
      console.log(token);
      sendMail(user.email, token)
      res.status(201).json(user);
    }).catch(result => {
      const errors = result.errors.map((err) => ({ message: err.message }))
      res.status(404).json(errors);
    });
    
  });

module.exports = router;