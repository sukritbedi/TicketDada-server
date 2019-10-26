const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuthAdminOnly = require('../middleware/auth-admin');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        cb(null, date + file.originalname);
    }
});

const upload = multer({storage: storage});

const Movie = require('../models/movie');

router.get('/', (req, res, next) =>{
  Movie.find()
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      movies: docs
    }
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err})
  })
});

router.post('/', checkAuthAdminOnly, upload.single('movieImage'), (req, res, next) =>{
  console.log(req.file);
  const movie = new Movie({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    runtime: req.body.runtime,
    imdb_rating: parseFloat(req.body.imdb_rating),
    rt_rating: parseFloat(req.body.rt_rating),
    age_rating: parseFloat(req.body.age_rating),
    description: req.body.description,
    image_source: req.file.path
  });
  movie.save()
    .then(result => {
      res.status(201).json({
        createdMovie: movie
      })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
  });


});

router.get('/:movieId', (req, res, next) =>{
  const id = req.params.movieId;
  Movie.findById(id)
  .exec()
  .then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res.status(404).json({message: 'No valid entry found for provided ID'});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  })
});

router.patch('/:movieId', checkAuthAdminOnly, (req, res, next) =>{
  const id = req.params.movieId;
  const updateOps = {
    name: req.body.name,
    runtime: req.body.runtime,
    imdb_rating: req.body.imdb_rating,
    rt_rating: req.body.rt_rating,
    age_rating: req.body.age_rating,
    image_source: req.body.image_source,
    description: req.body.description
  };

  Movie.update({_id: id}, { $set: updateOps})
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

router.delete('/:movieId', checkAuthAdminOnly, (req, res, next) =>{
  const id = req.params.movieId;
  Movie.deleteOne({_id: id})
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

module.exports = router;
