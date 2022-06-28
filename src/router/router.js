const express = require("express");

const router = express.Router();
const loginRoute = require("./login");
const registerRoute = require('./register')
const charactersRoute = require('./characters')
const moviesRoute = require('./movies');


// Routes
router.get("/", (req, res) => res.send("Server web corriendo"));

router.use("/auth/login", loginRoute);

router.use('/auth/register', registerRoute);

router.use('/characters',  charactersRoute);

router.use('/movies', moviesRoute);


module.exports = router;
