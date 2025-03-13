// import express
const express = require('express');
const router = express.Router();


// importiam il controller
const moviesController = require('../controller/moviesController');


// rotte crud

router.get('/', moviesController.index);

router.get('/:id', moviesController.show);


// esportiamo il modulo

module.exports = router;
