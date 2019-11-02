const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuthAdminOnly = require('../middleware/auth-admin');
const checkAuthAdminUserComp = require('../middleware/auth-admin-user-compound');

const User = require('../models/user')

router.post('/signup',(req, res, next) => {
  User.find({email_id: req.body.email})
  .exec()
  .then(user => {
    if(user.length > 0) {
      return res.status(409).json({
        message: "User email exists"
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
            email_id: req.body.email_id,
            password: hash,
            type: req.body.type
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
            res.status(500).json({
              error: err
            });
          });
        }
      })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
});

router.post('/login', (req, res, next) => {
  User.find({email_id: req.body.email_id})
  .exec()
  .then(user => {
    if(user.length < 1) {
      return res.status(401).json({
        message: 'Auth Failed'
      });
    }
    console.log(user);
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if(err) {
        return res.status(401).json({
          message: 'Auth Failed'
        });
      }
      if(result) {
        const token = jwt.sign({
          userId: user[0]._id,
          type: user[0].type
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        })
        if(user[0].type===1){
          return res.status(200).json({
            message: 'Auth Successful',
            token: token,
            url: 'admin'
          })
        } else {
          return res.status(200).json({
            message: 'Auth Successful',
            token: token,
            url: 'main'
          })
        }

      } else {
        return res.status(401).json({
          message: 'Auth Failed',
        });
      }
    })
  })
  .catch(err => {
    res.response(401).json({
      message: 'Auth Failed'
    });
  })
})

router.delete('/:userId', checkAuthAdminOnly, (req, res, next) => {
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

router.get('/', checkAuthAdminOnly, (req, res, next) => {
  User.find()
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      users: docs
    }
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err})
  })
})

router.get('/:userID', checkAuthAdminUserComp, (req, res, next) => {
  const id = req.params.userID;
  User.findById({_id: id})
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
})

router.patch('/:userID', checkAuthAdminUserComp, (req, res, next) => {
  const id = req.params.userID;
  const updateOps = {
    name: req.body.name,
    phone_number: req.body.phone_number,
    email_id: req.body.email_id,
    type: req.body.type
  };

  User.updateOne({_id: id}, { $set: updateOps})
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
