//const validator = require("../../../node_modules/validator/index");
//const { models }  = require('../../database/models/models');



function checkSchemaCharacter (req, res, next){
    const keys = ["name", "image", "age", "weight", "history", "movie"];
    let result = true;
    
    keys.map(item =>{
        !Object.keys(req.body).includes(item) && (result = false)
    })
    if (result) {
        next();
      } else {
        return res.status(401).json({ message: "Falla modelo, no contiene la keys necesarias" });
      }
};


function checkSchemaMovie (req, res, next){
  const keys = ["name", "image", "qualification", "createdDate", "genderId"];
  let result = true
  keys.map(item =>{
      !Object.keys(req.body).includes(item) && (result = false)
  })
  if (result) {
      next();
    } else {
      return res.status(401).json({ message: "Falla modelo, no contiene la keys necesarias" });
    }
};

function checkSchemaLogin (req, res,next){
  const keys = ["email", "password"];
  let result = true
  keys.map(item =>{
      !Object.keys(req.body).includes(item) && (result = false)
  })
  if (result) {
      next();
    } else {
      return res.status(401).json({ message: "Falla modelo, no contiene la keys necesarias" });
    }
}

function checkSchemaRegister (req, res,next){
  const keys = ["email", "password", "userName"];
  let result = true
  keys.map(item =>{
      !Object.keys(req.body).includes(item) && (result = false)
  })
  if (result) {
      next();
    } else {
      return res.status(401).json({ message: "Falla modelo, no contiene la keys necesarias" });
    }
}

module.exports =  {
  checkSchemaCharacter: checkSchemaCharacter,
  checkSchemaMovie: checkSchemaMovie,
  checkSchemaLogin: checkSchemaLogin,
  checkSchemaRegister: checkSchemaRegister
};