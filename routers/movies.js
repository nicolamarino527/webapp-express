// import express
const express = require('express');
const router = express.Router();


// importiam il controller
const moviesController = require('../controller/moviesController');


// rotte crud

// index
router.get('/', moviesController.index);

// show
router.get('/:id', moviesController.show);

// store(review)
router.post('/:id/reviews', moviesController.storeReview);

// esportiamo il modulo

module.exports = router;
