const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuthAdminOnly = require('../middleware/auth-admin');
const checkAuthUserOnly = require('../middleware/auth-user');
const checkAuthAdminUserComp = require('../middleware/auth-admin-user-compound');

const Transaction = require('../models/transaction');

router.get('/', checkAuthAdminOnly, (req, res, next) =>{
  res.status(200).json({
    message: 'Hello Boy'
  });
});

router.post('/', checkAuthUserOnly, (req, res, next) =>{
  res.status(200).json({
    message: 'Hello Boy'
  });
});

router.get('/:transId', checkAuthAdminUserComp, (req, res, next) =>{
  const id = req.params.transId;
  res.status(200).json({
    message: 'Hello Boy'
  });
});

router.delete('/:transId', checkAuthAdminUserComp, (req, res, next) =>{
  const id = req.params.transId;
  res.status(200).json({
    message: 'Hello Boy'
  });
});

module.exports = router;
