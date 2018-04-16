'use strict';

const process = require('process');
const bodyParser = require('body-parser');
const repo = require('./config/github-api').repo;
const api = require('./lib/github-api');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

// check for updates
app.use("/", (req, res, next) => {
  if (process.env.SHA) {
    api.repos.getBranch({
      owner: repo.owner,
      repo: repo.repo,
      branch: repo.branch
    }).then(({
      data,
      meta
    }) => {
      if (data.commit.sha !== process.env.SHA) {
        res.status(503).send('A new version is available... server will restart soon');
      } else {
        next();
      }
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
  } else {
    console.warn('No SHA defined. If this is a production environment, it may be vulnerable to attack.');
    next();
  }
});

app.use('/pulls', require('./controllers/pulls'));

const server = app.listen(3000);