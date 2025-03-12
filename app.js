// express
const express = require('express');
const app = express();
const port = 3000;

// importiamo cors
const cors = require('cors')


// importiamo il router
const movieRouter = require('./controller/moviesController');


// importiamo il middleware di gestione errore server
const errorsHandler = require("./middlewares/errorsHandler");
const imagePathMiddleware = require('./middlewares/imagePath');
const notFound = require("./middlewares/notFound");


// cartella per i file statici
app.use(express.static('public')); s

// middleware cors
app.use(cors({ origin: "http://localhost:5173" }))


// body-parser
app.use(express.json());

// rotta home
app.get('/api', (req, res) => {
    res.send("rotta home");
})

// middleware path 
app.use(imagePathMiddleware);

// gestione errore
app.use(errorsHandler);

// utilizzo not found
app.use(notFound);

// avvio del server sulla porta specificata
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})