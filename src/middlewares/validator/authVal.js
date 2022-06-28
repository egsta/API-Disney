const validator = require("../../../node_modules/validator/index");
const { models }  = require('../../database/models/models');

const registerRules = async (obj) => {
  let error = [];

  error = verificaPass(obj.password);
  if (!validator.isAlpha(obj.userName))
    error.push({ message: "El nombre de usuario tiene que ser alfabetico" });
  if (validator.isEmpty(obj.userName))
    error.push({ message: "El nombre de usuario no puede estar vacio" });
    if (validator.isEmpty(obj.email))
    error.push({ message: "El email no puede estar vacio" });
  if (!validator.isEmail(obj.email)){
    error.push({ message: "No ingreso un email valido" });
  }
  return new Promise((resolve) => {
  models.User.findOne({where: {email: obj.email} }).then((item) =>{
    item !== null && error.push({message: "El email ya se encuentra registrado"});
        resolve(error);      
    }).catch((err) => {
        error.push(err);
        resolve(error);
    });
  });
  
};

function validateRegister(req, res, next) {
  //let result ;
  registerRules(req.body).then((result) => {
    if (result.length == 0) {
      next();
    } else {
      const errors = result.map((err) => ({ message: err.message }));
      res.status(400).json(errors);
    }
  });
}

function verificaPass(entrada) {
  const password = entrada.split("");
  let caracter = "";
  let contnumeros = 0;
  let tienesimbolos = 0;
  //condiciones de password
  let largo = 1;
  let tieneminusculas = 1;
  let tienemayusculas = 1;
  let tieneceros = 0;
  let repiteCaracter = 0;
  let tiene2simbolos = 1;
  let repiteCE = 0;
  let tiene4num = 1;
  let tieneespacio = 0;

  //Array datos permitidos
  let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  let minusculas = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "ñ",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let mayusculas = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "Ñ",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let simbolos = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "ˆ",
    "&",
    "*",
    "-",
    "_",
    "+",
    "=",
    "?",
  ];

  password.map((pass) => {
    //repite caracrter
    if (pass == caracter) {
      repiteCaracter++;
    }
    caracter = pass;
    //verifica numeros y si ingreso 0
    if (!isNaN(pass)) {
      if (pass == 0) {
        tieneceros = 1;
      }
      contnumeros++;
    }
    //verifica minusculas
    if (tieneminusculas == 1)
      if (minusculas.includes(pass)) tieneminusculas = 0;
    // Verifica mayusculas
    if (tienemayusculas == 1)
      if (mayusculas.includes(pass)) tienemayusculas = 0;
    // Verifica simbolos

    if (simbolos.includes(pass)) {
      tienesimbolos++;
      let countsimbolos = password.filter((item) => item == pass);
      countsimbolos.length > 1 ? (repiteCE = 1) : "";
    }

    if (pass == " ") tieneespacio = 1;
  });

  //Verifica cantidad caracteres
  if (password.length > 15) largo = 0;
  if (contnumeros > 3) tiene4num = 0;
  if (tienesimbolos > 1) tiene2simbolos = 0;

  let errors = [];


  tieneminusculas != 0 &&
    errors.push({
      message: "La contraseña debe contener al menos una minuscula",
    });

  tienemayusculas != 0 &&
    errors.push({
      message: "La contraseña debe contener al menos una mayuscula",
    });

  tiene2simbolos != 0 &&
    errors.push({
      message: "La contraseña debe contener al menos 2 caracteres especiales",
    });

  tieneceros != 0 &&
    errors.push({
      message: "La contraseña No debe contiene 0",
    });

  repiteCaracter != 0 &&
    errors.push({
      message:
        "La contraseña No debe contener dos numeros o letras o carecteres especiales iguales consecutivos",
    });

  repiteCE != 0 &&
    errors.push({
      message: "La contraseña No debe repetir caracteres especiales",
    });

  largo != 0 &&
    errors.push({
      message: "La contraseña debe ingresar por lo menos 16 caracteres",
    });

  tiene4num != 0 &&
    errors.push({
      message: "La contraseña debe contener al menos 4 numeros",
    });

  tieneespacio != 0 &&
    errors.push({
      message: "La contraseña No debe contener espacio en blanco",
    });

    return errors;
}
module.exports = {
  validateRegister,
};
