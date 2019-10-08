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

router.get('/:transId', (req, res, next) =>{
  const id = req.params.transId;
  res.status(200).json({
    message: 'Hello Boy'
  });
});

router.delete('/:transId', (req, res, next) =>{
  const id = req.params.transId;
  res.status(200).json({
    message: 'Hello Boy'
  });
});

module.exports = router;
