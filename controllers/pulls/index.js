'use strict';

const express = require('express');
const repo = require('../../config/github-api').repo;
const api = require('../../lib/github-api');

const router = express.Router();

function list(state) {
  return (req, res, next) => 
    api.pullRequests.getAll({
        repo: repo.repo,
        owner: repo.owner,
        state
      })
      .then(result => { res.render('pulls/list', {state, ...result}); })
      .catch(err => { next(err); });
}

function item() {
  return (req, res, next) => {
    const number = parseInt(req.params.number);

    return api.pullRequests.get({
        number,
        repo: repo.repo,
        owner: repo.owner,
      })
      .then(result => { res.render('pulls/item', {number, ...result}); })
      .catch(err => { next(err); });
  };
}

function merge() {
  return (req, res, next) => {
    const number = parseInt(req.params.number);

    return api.pullRequests.get({
        number,
        repo: repo.repo,
        owner: repo.owner,
      })
      .then(pr => {
        const title = `Merge pull request #${number} from ${pr.head.label}`;
        const message = pr.title;
        const sha = pr.head.sha;

        return api.pullRequests.merge({
            repo: repo.repo,
            owner: repo.owner,
            number,
            commit_title: title,
            commit_message: message,
            sha
          });
      })
      .then(result => { res.render('pulls/merged', {number, ...result}); })
      .catch(err => { next(err); });
  };
}

router.get('/', list('open'));
router.get('/closed', list('closed'));
router.get('/all', list('all'));

router.get('/:number', item());

router.post('/merge', merge());

module.exports = router;