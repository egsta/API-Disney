const express = require("express");
const { models } = require("../database/models/models");
const checkJwt = require("../middlewares/jwt");
const { checkSchemaCharacter }= require("../middlewares/validator/schemaValidator");
const router = express.Router();

const character = models.Character;
const movie = models.Movie;

router.use(checkJwt);

// Get Listado

router.get("/", (req, res, next) => {

  console.log(("get listado"))
  const reqQuery = Object.keys(req.query).toString();
  console.log("charac", reqQuery);

  if (reqQuery == "") {
    character
      .findAll({
        attributes: ["image", "name"],
      })
      .then((list) => {
        res.json(list);
      });
  }
  //?name=
  //?age=
  else if (reqQuery == "age" || reqQuery == "name") {
    console.log("age-name");
    character
      .findAll({
        where: req.query,
        include: { model: movie, as: "movies", attributes: ["name"] },
      })
      .then((list) => {
        res.json(list);
      });
  }
  //?movies=
  else if (reqQuery == "movies") {
    character
      .findAll({
        include: {
          model: movie,
          as: "movies",
          attributes: ["name"],
          where: { id: req.query.movies },
        },
      })
      .then((list) => {
        res.json(list);
      });
  } else {
    res.json({ metodo: "No Encontrado" });
  }
});

// CREATE
router.post("/", checkSchemaCharacter, (req, res) => {
  let upData = {};
  
  upData.name = req.body.name;
  upData.image = req.body.image;
  upData.age = req.body.age;
  upData.weight = req.body.weight;
  upData.history = req.body.history;
  upData.movie = req.body.movie
  //console.log(upData);

  movie.findByPk(upData.movie).then((item) => {
    item !== null
      ? character
          .create(
            upData
          ).catch((result) => {
            const errors = result.errors.map((err) => ({message: err.message }));
            res.json(errors);
          })
          .then((obj) => {
            obj != null &&
            obj.addMovie(upData.movie);
            res.json(obj);
          }).catch((result) => {
           // console.log(result)
            res.json(result);
          })
      : res.json({ error: "La Pelicula no esta ingresada" });
  }).catch((result) => {
    //console.log(result);
    const errors = result.errors.map((err) => ({message: err.message }));
    res.json(errors);
  });
  
});

router.get("/:id", (req, res) => {
  console.log("findByPk", req.params);
  character
    .findByPk(req.params.id, {
      include: { model: movie, as: "movies", attributes: ["name"] },
    })
    .then((obj) => {
      res.json(obj);
    });
});

//UPDATE
router.put("/:id", checkSchemaCharacter , (req, res) => {
  console.log("update", req.params.id);
  let upData = {};
  req.body.name !== "" ? (upData.name = req.body.name) : "";
  req.body.image !== "" ? (upData.image = req.body.image) : "";
  req.body.age !== "" ? (upData.age = req.body.age) : "";
  req.body.weight !== "" ? (upData.weight = req.body.weight) : "";
  req.body.history !== "" ? (upData.history = req.body.history) : "";

  console.log(upData);

  let mov = null;
  req.body.movie !== "" && (mov = req.body.movie);
  mov !== null
    ? movie.findByPk(req.body.movie).then((item) => {
        item !== null
          ? models.CharacterMovie.update(
              { movieId: mov },
              {
                where: { characterId: req.params.id },
              }
            ).then((objCM) => {
              let msg = [];
              objCM == 1 &&
                msg.push({ message: "Se modifico indice de pelicula" });
              character
                .update(upData, { where: { id: req.params.id } })
                .then((obj) => {
                  obj == 1 && msg.push({ message: "Se modifico character" });
                  res.json(msg);
                })
                .catch((result) => {
                  const errors = result.errors.map((err) => ({message: err.message }));
                  res.json(errors);
                });
            })
          : res.json({ error: "La Pelicula no esta ingresada" });
      })
    : character.update(upData, { where: { id: req.params.id } }).then((obj) => {
        res.json(obj);
      });
});

//DELETE
router.delete("/:id", (req, res) => {
  console.log("delete", req.params.id);
  character
    .destroy({
      where: { id: req.params.id },
    })
    .then((obj) => {
      res.json(obj);
    });
});

module.exports = router;
