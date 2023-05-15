const express = require('express');
const { addMovie, getAllMovie, getMovieById } = require('../controllers/movie-controller.js');
const movieRouter = express.Router();

movieRouter.get('/',getAllMovie)
movieRouter.post('/',addMovie);
movieRouter.get('/:id',getMovieById)

module.exports = movieRouter; 