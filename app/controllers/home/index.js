'use strict';

const express = require('express');
const repo = require$('config/github/repo');
const api = require$('lib/github-api');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home/index');
});

module.exports = router;