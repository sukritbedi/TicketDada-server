const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuthAdminOnly = require('../middleware/auth-admin');
const checkAuthUserOnly = require('../middleware/auth-user');
const checkAuthAdminUserComp = require('../middleware/auth-admin-user-compound');
const jwt = require('jsonwebtoken');

const Transaction = require('../models/transaction');

router.get('/', checkAuthAdminOnly, (req, res, next) =>{
  Transaction.find()
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      transactions: docs
    }
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err})
  })
});

router.post('/', checkAuthUserOnly, (req, res, next) =>{
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const trans = new Transaction({
    _id: new mongoose.Types.ObjectId(),
    user_id: decoded.userId,
    movie_id: req.body.movie_id,
    cinema: req.body.cinema,
    timestamp: req.body.timestamp,
    movie_timings: req.body.movie_timings,
    movie_name: req.body.movie_name
  })
  console.log(trans);
  trans.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message:'Transaction recorded'
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.get('/:transId', checkAuthAdminUserComp, (req, res, next) =>{
  const id = req.params.transId;
  Transaction.findById({_id: id})
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

router.delete('/:transId', checkAuthAdminUserComp, (req, res, next) =>{
  const id = req.params.transId;
  Transaction.deleteOne({_id: id})
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
