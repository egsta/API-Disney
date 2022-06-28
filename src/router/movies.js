const express = require("express");
const Character = require("../database/models/Character");
const Gender = require("../database/models/Gender");
const { models } = require("../database/models/models");
const checkJwt = require("../middlewares/jwt");
const {
  checkSchemaMovie,
} = require("../middlewares/validator/schemaValidator");

const router = express.Router();

const movie = models.Movie;

router.use(checkJwt);

router.get("/", checkJwt, (req, res) => {
  const reqQuery = Object.keys(req.query).toString();

  if (reqQuery == "") {
    movie
      .findAll({
        attributes: ["name", "image", "createdDate"],
      })
      .then((list) => {
        res.json(list);
      });
  } else if (reqQuery == "name" || reqQuery == "genderId") {
    movie
      .findAll({
        where: req.query,
        include: [{ model: Character, as: "characters" }],
      })
      .then((list) => {
        res.json(list);
      }).catch(result => {
        console.log(result);
      });
  } else if (req.query.order == "DESC") {
    movie
      .findAll({
        include: [{ model: Character, as: "characters" }],
        order: [["id", "DESC"]],
       
      })
      .then((list) => {
        res.json(list);
      });
  } else if (req.query.order == "ASC") {
    movie
      .findAll({
        include: [{ model: Character, as: "characters" }],
        order: [["id", "ASC"]],
  
      })
      .then((list) => {
        res.json(list);
      });
  } else {
    res.json({ metodo: "No Encontrado" });
  }
});

// CREATE Movie
router.post("/", checkSchemaMovie, (req, res) => {
  Gender.findByPk(req.body.genderId)
    .then((item) => {
      item !== null
        ? movie
            .create(req.body)
            .then((obj) => {
              res.json(obj);
            })
            .catch((result) => {
              const errors = result.errors.map((err) => ({
                message: err.message,
              }));
              res.json(errors);
            })
        : res.json({
            error: "Genero desconocido, no se pudo agregar pelicula",
          });
    })
    .catch((result) => {
      const errors = result.errors.map((err) => ({ message: err.message }));
      res.json(errors);
    });
});


// GET by ID
router.get("/:id", (req, res) => {
  console.log("findByPk", req.params);
  movie
    .findByPk(req.params.id, {
      include: { model: Character, as: "characters" },
    })
    .then((obj) => {
      res.json(obj);
    });
});

//UPDATE
router.put("/:id", checkSchemaMovie, (req, res) =>{
  console.log("Llego a update");
  let upData = {};
  req.body.name !== "" ? (upData.name = req.body.name) : "";
  req.body.image !== "" ? (upData.image = req.body.image) : "";
  req.body.qualification !== "" ? (upData.qualification = req.body.qualification) : "";
  req.body.createdDate !== "" ? (upData.createdDate = req.body.createdDate) : "";
  req.body.genderId !== "" ? (upData.weight = req.body.weight) : "";

  movie.update(upData, {where: { id: req.params.id}}).then((obj) => {

    
    res.json(obj == 1 ? ({ message: "Se modifico la pelicula" }): ({ message: "No se pudo modificar la pelicula"}));
  })
  .catch((result) => {
    console.log(result);
    const errors = result.errors.map((err) => ({message: err.message }));
    res.json(errors);
  });

})


//DELETE
router.delete("/:id", (req, res) => {
  console.log("delete", req.params.id);
  movie
    .destroy({
      where: { id: req.params.id },
    })
    .then((obj) => {
      res.json(obj);
    })
    .catch((result) => {
      console.log(result);
      const errors = result.errors.map((err) => ({ message: err.message }));
      res.json(errors);
    });
});

module.exports = router;
