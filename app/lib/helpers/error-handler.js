'use strict';

/**
 * Module dependencies
 */
const fs = require('fs');

/**
 * Express middleware
 */
module.exports = function (err, req, res, next) {
  const code = err.code || 500;
  const meta = err.headers;
  const specificView = `errors/${code}`;
  const genericView = 'errors/_generic';
  const specificViewPath = `${__dirname}/views/${specificView}.pug`;
  const view = fs.existsSync(specificViewPath) ? specificView : genericView;

  // Try to convert the message to an object
  let data = err.message;
  try {
    data = JSON.parse(err.message);
  } catch (_) {}

  res.status(code).render(view, {code, data, err, meta});
  next(err);
};