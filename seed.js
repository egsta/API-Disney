const { models } = require("./src/database/models/models");
const sequelize = require("./src/database/sequelize");
require("./src/database/associations");

const movies = [
  {
    image:
      "https://static.wikia.nocookie.net/disneyypixar/images/b/b7/The_Little_Mermaid_Poster.jpg/revision/latest?cb=20200803001021&path-prefix=es",
    name: "La sirenita",
    createdDate: "01/01/1989",
    qualification: 3,
  },
  {
    image:
      "https://static.wikia.nocookie.net/doblaje/images/e/e0/Lion_king_1.jpg/revision/latest?cb=20200726001925&path-prefix=es",
    name: "El Rey Leon",
    createdDate: "01/01/1994",
    qualification: 3,
  },
  {
    image: "https://pics.filmaffinity.com/Mulan-247098384-large.jpg",
    name: "Mulan",
    createdDate: "01/01/1998",
    qualification: 3,
  },
];

const characters = [
  {
    name: "Ariel",
    image:
      "https://static.wikia.nocookie.net/disney/images/a/a0/Ariel-1.png/revision/latest?cb=20170929163212&path-prefix=es",
    age: 12,
    weight: 35,
    history: "No vi la peli",
  },
  {
    name: "Ursula",
    image:
      "https://static.wikia.nocookie.net/disney/images/a/a4/Ursula.png/revision/latest?cb=20180924212517&path-prefix=es",
    age: 25,
    weight: 50,
    history: "No vi la peli y no se Ursula",
  },
  {
    name: "Simba",
    image:
      "https://static.wikia.nocookie.net/disney/images/d/d7/Simba_cachorro.png/revision/latest?cb=20120207142439&path-prefix=es",
    age: 10,
    weight: 50,
    history: "Es el rey leon que se perdio",
  },
  {
    name: "Scar",
    image:
      "https://static.wikia.nocookie.net/disney/images/c/c7/Scar.png/revision/latest?cb=20121008181300&path-prefix=es",
    age: 27,
    weight: 80,
    history: "Es el rey leon que quiere ser jefe",
  },
  {
    name: "FaMulan",
    image:
      "https://static.wikia.nocookie.net/disney/images/8/83/FaMul%C3%A1n.png/revision/latest?cb=20130830100817&path-prefix=es",
    age: 16,
    weight: 43,
    history:
      "Fa Mulan y más tarde Li Mulan es la protagonista de la película de animación de Disney de 1998 Mulan y su secuela, Mulan 2. Está inspirada en la legendaria Hua Mulan del poema chino Balada de Mulan. Está incluida en la lista oficial de Princesas Disney",
  },
  {
    name: "LiShang",
    image:
      "https://static.wikia.nocookie.net/disney/images/a/a0/Shang.jpg/revision/latest?cb=20110702105814&path-prefix=es",
    age: 18,
    weight: 70,
    history:
      "El General Li Shang es un apuesto y valiente joven que lucha por su país. En la fatídica guerra de China contra los Hunos pierde a su padre, pero gana al amor de su vida, Mulan.",
  },
];

const gender = [
  { name: "Terror", image: "http://imagenTerror.com" },
  { name: "Comedia", image: "http://imagenComedia.com" },
  { name: "Suspenso", image: "http://imagenSuspenso.com" },
  { name: "Romantica", image: "http://imagenRomantica.com" },
  { name: "Accion", image: "http://imagenAccion.com" },
  { name: "Documental", image: "http://imagenDocumental.com" },
  { name: "Animada", image: "http://imagenAnimada.com" },
];

sequelize
  .sync({ force: true })
  .then(() => {
    characters.forEach((element) => {
      models.Character.create(element)
        .then((obj) => {
          console.log(`models.Character Creada: ${obj}`);
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
  })
  .then(() => {
    gender.forEach((element) => {
      models.Gender.create(element)
        .then((obj) => {
          console.log(`models.Gender Creada: ${obj}`);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  })
  .then(() => {
    movies.forEach((element, index) => {
      models.Movie.create(element)
        .then((obj) => {
            obj.update(
                {
                genderId: index+1
                }
            )
          console.log(`models.Movie Creada: ${obj}`);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  })
  
  .then(() => {
    for(j=1; j<7; j++)
    {
        let i=0;
        j <= 2 ? i= 1 :
        j == 3 || j == 4 ? i=2 : i=3;

        models.Character.findByPk(j).then((character_list) => {
            console.log(character_list);
            models.Movie.findByPk(i).then((mov) => {
              console.log(mov);
              character_list.addMovie(mov);
            });
          });
    }
    
  });
