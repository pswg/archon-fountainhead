'use strict';

const express = require('express');
const repo = require$('config/github/repo');
const api = require$('lib/github-api');

const router = express.Router();

function list(state) {
  return (req, res, next) => 
    api.pullRequests.getAll({
        repo: repo.repo,
        owner: repo.owner,
        state
      })
      .then(result => { 
        result.data = result.data.filter(pr => pr.merged_at);
        res.render('lore/list', {state, ...result}); })
      .catch(err => { 
        next(err); });
}

function item() {
  return (req, res, next) => {
    const number = parseInt(req.params.number);

    return api.pullRequests.get({
        number,
        repo: repo.repo,
        owner: repo.owner,
      })
      .then(result => { res.render('lore/item', {number, ...result}); })
      .catch(err => { next(err); });
  };
}

router.get('/', list('closed'));
router.get('/:number', item());

module.exports = router;