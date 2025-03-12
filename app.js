// express
const express = require('express');
const app = express();
const port = process.env.PORT;



// importiamo il router
const movieRouter = require('./controller/moviesController');


// importiamo il middleware di gestione errore server
const errorsHandler = require("./middlewares/errorsHandler");
const imagePathMiddleware = require('./middlewares/imagePath');
const notFound = require("./middlewares/notFound");

// configuriamo il body parser
