'use strict';

const express = require('express');
const repo = require$('config/github/repo');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home/index');
});

module.exports = router;