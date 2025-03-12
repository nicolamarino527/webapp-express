// express
const express = require('express');
const app = express();
const port = process.env.PORT;



// importiamo il router
const movieRouter = require('./controller/moviesController');
const bodyParser = require('body-parser');
// configuriamo il body parser
app.use(express.json());

// definiamo la cartella per i file statici
app.use(express.static('public'));


// definiamo la rotta posts
app.use('/movies', movieRouter)

// aggiungiam la rotta home
app.get('/', (req, res) => {
    res.send('films')
});

app.listen(port, () => {
    console.log(`server in ascolto su ${port}`);
})

