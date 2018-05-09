'use strict';

const express = require('express');
const repo = require$('config/github/repo');
const md = require("../../lib/helpers/markdown-renderer");

const router = express.Router();

function list(state) {
  return (req, res, next) => 
    req.api().pullRequests.getAll({
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

    return req.api().pullRequests.get({
        number,
        repo: repo.repo,
        owner: repo.owner,
      })
      .then(result => { res.render('pulls/item', {number, ...result,md}); })
      .catch(err => { next(err); });
  };
}

function merge() {
  return (req, res, next) => {
    const number = parseInt(req.body.number);
    const api = req.api();

    return api.pullRequests.get({
        number,
        repo: repo.repo,
        owner: repo.owner,
      })
      .then(({ data }) => {
        const title = `Merge pull request #${number} from ${data.head.label}`;
        const message = data.title;
        const sha = data.head.sha;

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