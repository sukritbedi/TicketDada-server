const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user')

router.post('/signup',(req, res, next) => {
  User.find({email_id: req.body.email})
  .exec()
  .then(user => {
    if(user.length > 0) {
      return res.status(409).json({
        message: "Mail exists"
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err,hash) =>{
        if (err) {
          return res.status(500).json({
            error: err
          })
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            phone_number: req.body.phoneNum,
            email_id: req.body.email,
            password: hash,
            type: req.body.userType
          });
          user
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message:'User Created'
            })
          })
          .catch(err => {
            console.log(err);
            res.response(500).json({
              error: err
            });
          });
        }
      })
    }
  });
});

router.delete('/:userId', (req, res, next) => {
  User.remove({_id: req.params.userId})
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json({
      message:'User Deleted'
    })
  })
  .catch(err => {
    console.log(err);
    res.response(500).json({
      error: err
    });
  });
});

module.exports = router;
