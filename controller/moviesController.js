// importiamo i post 
const { query } = require('express');
const posts = require('../data/db');
const connection = require('../data/db');

// impostiamo le funzioni realtive alle funzioni del router 

// funzione index 
function index(req, res) {

    // facciamo la richiesta dei film al db
    const moviesSql = "SELECT * FROM movies;";

    connection.query(moviesSql, (err, result) => {
        // in caso di errore
        if (err) return res.status(500).json({ error: 'Database query failed(index)' });

        // map della risposta
        const movies = result.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        // nel caso di rsposta
        res.json(movies)
    })

}
// funzione show
function show(req, res) {
    // recuperiamo l'id
    const { id } = req.params;

    // query di richiesta
    const movieDetail = "SELECT * FROM movies WHERE id = ?";
    const movieReview = "SELECT * FROM reviews WHERE movie_id = ?";

    // richiediamo i risultati del singolo libro
    connection.query(movieDetail, [id], (err, movieResult) => {
        // se la query non va a buon fine
        if (err) return res.status(500).json({ error: 'Database query failed(show)' });

        // se il film non viene trovato
        if (movieResult.length === 0) return res.status(404).json({ error: 'Movie not found' });

        // se va bene
        const movie = movieResult[0];

        connection.query(movieReview, [id], (err, reviewResult) => {
            // in caso di errore
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // aggiorniamo l oggetto movie con le reviews
            movie.reviews = reviewResult;

            // aggiungiamo il valore path img da middleware
            movie.image = req.imagePath + movie.image;

            // ritorniamo l'oggetto completo di reviews
            res.json(movie);
        })
    })

}

// funzione store della review
function storeReview(req, res) {
    // conserviamo l'id
    const { id } = req.params;

    // prendiamo le informazioni della review
    const { text, name, vote } = req.body;

    const insertReviewSql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)';

    // eseguiamo la query
    connection.query(insertReviewSql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed(store)' });
        res.status(201).json({ message: 'Review added', id: results.insertId });
    });
}

// funzione show del film
function storeFilm(req, res) {
    // recuperiao le informazioni
    const { title, director, abstract } = req.body

    // gestiamo il valiore del file creato dal middlewere
    const imageName = `${req.file.filename}`;

    // creiamo la query
    const query = "INSERT INTO movies (title, director, image, abstract) VALUES (?, ?, ?, ?)"

    connection.query(query,
        [title, director, imageName, abstract],
        (err, result) => {
            if (err) {
                console.log(err)
                return next(new Error("Errore interno del server"));
            }

            res.status(201).json({
                status: "success",
                message: "Film aggiunto con successo!",
            });
        })

}

module.exports = { index, show, storeReview };