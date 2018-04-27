'use strict';

/**
 * Module dependencies
 */
import fs from 'fs';

/**
 * Express middleware
 */
export default function (err, req, res, next) {
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
  }
  catch (_) { }
  res.status(code).render(view, { code, data, err, meta }, (err, html) => {
    if (err) console.error(err);
  });
  next(err);
}