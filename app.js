'use strict';

const fs = require('fs');
const process = require('process');
const bodyParser = require('body-parser');
const repo = require('./config/github-api').repo;
const api = require('./lib/github-api');
const express = require('express');

const app = express();

app.set('view engine', 'pug');

// :feather-icons pug filter middleware
const feather = require('feather-icons');
app.use(function (req, res, next) {
  const iconSizes = {
    super: 32,
    xlarge: 24,
    large: 20,
    medium: 16,
    small: 13,
    xsmall: 10,
    tiny: 8
  };

  res.locals.filters = {
    'feather-icon': (name, opts) => {
      let {filename, size, ...rest} = opts;
      if (typeof size === 'string')
        size = iconSizes[size];
      if (!size)
        size = iconSizes.medium;

      const attrs = {width: size, height: size, ...rest};
      return feather.icons[name].toSvg(attrs);
    },
    
    ...res.locals.filters
  };

  next();
});

app.use(bodyParser.urlencoded({extended: true}));

// check for updates
app.use('/', (req, res, next) => {
  if (process.env.SHA) {
    api.repos.getBranch({
      owner: repo.owner,
      repo: repo.repo,
      branch: repo.branch
    }).then(({data, meta}) => {
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
    console.warn('SHA not defined. If this is a production environment, it may be vulnerable to attack.');
    next();
  }
});

app.use('/pulls', require('./controllers/pulls'));

// generic error handler
app.use(function (err, req, res, next) {
  const code = err.code || 500;
  const meta = err.headers;
  const specificView = `errors/${code}`;
  const genericView = 'errors/_generic';
  const specificViewPath = `${__dirname}/views/${specificView}.pug`;
  const view = fs.existsSync(specificViewPath) ? specificView : genericView;

  // Try to convert the message to an object
  let data;
  try {
    data = JSON.parse(err.message);
  } catch (_) {}

  res.status(code).render(view, {code, data, err, meta});
  next(err);
});

const server = app.listen(3000);