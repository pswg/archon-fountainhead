'use strict';

/**
 * Module dependencies
 */
const bodyParser = require('body-parser');
const express = require('express');

/**
 * Utility function for loading modules relative to the application root.
 * @param {string} path 
 */
global.require$ = path => require(__dirname + '/' + path);

const checkShaHelper = require$('lib/helpers/check-sha');
const errorHandlerHelper = require$('lib/helpers/error-handler');
const featherIconHelper = require$('lib/helpers/feather-icon');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'pug');

app.use(featherIconHelper);
app.use(checkShaHelper);

app.use('/pulls', require('./controllers/pulls'));
app.use('/assets', express.static('assets'));

app.use(errorHandlerHelper);

const server = app.listen(3000);