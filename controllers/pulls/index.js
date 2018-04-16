'use strict';

const express = require('express');
const repo = require('../../config/github-api').repo;
const api = require('../../lib/github-api');

const router = express.Router();

router.get('/', function (req, res) {
  res.sendFile('merge.html', {
    root: __dirname + '../../../views/'
  });
});

router.get('/:number', function (req, res) {
  const number = parseInt(req.params.number);

  api.pullRequests.get({
      number,
      repo: repo.repo,
      owner: repo.owner,
    })
    .then(({data, meta}) => {
      console.log(result);
    });
});

router.post('/:number/merge', function (req, res) {
  const number = parseInt(req.params.number);

  api.pullRequests.get({
      number,
      repo: repo.repo,
      owner: repo.owner,
    })
    .then((pr) => {
      const title = `Merge pull request #${number} from ${pr.head.label}`;
      const message = pr.title;
      const sha = pr.head.sha;

      return rp.put({
          repo: repo.repo,
          owner: repo.owner,
          number,
          commit_title: title,
          commit_message: message,
          sha
        })
        .then(({
          message,
          sha
        }) => res.send(`Result: ${message} \nsha: ${sha}`));
    })
    .catch(({
      message,
      documentation_url
    }) => res.send(`Failed: ${message}`));
});

module.exports = router;