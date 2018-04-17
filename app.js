'use strict';

const process = require('process');
const bodyParser = require('body-parser');
const repo = require('./config/github/repo');
const api = require('./lib/github-api');
const checkShaHelper = require('./lib/helpers/check-sha');
const errorHandlerHelper = require('./lib/helpers/error-handler');
const featherIconHelper = require('./lib/helpers/feather-icon');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'pug');

app.use(featherIconHelper);
app.use(checkShaHelper);

app.use('/pulls', require('./controllers/pulls'));

app.use(errorHandlerHelper);

const server = app.listen(3000);