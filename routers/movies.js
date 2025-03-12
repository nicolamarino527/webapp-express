// import express
const express = require('express');
const router = express.Router();


// importiam il controller
const controller = require('../controller/moviesController');


// rotte crud

router.get('/', controller.index);

router.get('/:id', controller.show);


// esportiamo il modulo

module.exports = router;
