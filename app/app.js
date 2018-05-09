'use strict';

/**
 * Module dependencies
 */
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

/**
 * Utility function for loading modules relative to the application root.
 * @param {string} path 
 */
global.require$ = p => require(path.join(__dirname, p));

const checkShaHelper = require$('lib/helpers/check-sha');
const errorHandlerHelper = require$('lib/helpers/error-handler');
const featherIconHelper = require$('lib/helpers/feather-icon');
const gitHubApiHelper = require$('lib/helpers/github-api');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(favicon(path.join(__dirname, 'assets/favicon.ico')));

app.use(featherIconHelper);
app.use(gitHubApiHelper);
app.use(checkShaHelper);

app.use('/', require('./controllers/home'));
app.use('/lore', require('./controllers/lore'));
app.use('/pulls', require('./controllers/pulls'));

app.use(errorHandlerHelper);

const server = app.listen(process.env.PORT || 3000);