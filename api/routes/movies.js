const express = require('express');
const router = express.Router();



router.get('/', (req, res, next) =>{
  res.status(200).json({
    message: 'Hello Boy'
  });
});

router.post('/', (req, res, next) =>{
  res.status(200).json({
    message: 'Hello Boy'
  });
});

router.get('/:movieId', (req, res, next) =>{
  const id = req.params.movieId;
  res.status(200).json({
    message: 'Hello Boy'
  });
});

router.patch('/:movieId', (req, res, next) =>{
  const id = req.params.movieId;
  res.status(200).json({
    message: 'Hello Boy'
  });
});

router.delete('/:movieId', (req, res, next) =>{
  const id = req.params.movieId;
  res.status(200).json({
    message: 'Hello Boy'
  });
});

module.exports = router;
