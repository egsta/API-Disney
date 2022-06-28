
const cors = require('cors');
const express = require('express')
const router = require('./router/router')

const app = express()

 app.use(cors())
 app.use(express.json());
 app.use(express.urlencoded({ extended: false} ));

app.use('/', router);


// Global variables
app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
  });


module.exports = app