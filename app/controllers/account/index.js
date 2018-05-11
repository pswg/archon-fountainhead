'use strict';

const qs = require('querystring');
const {Router} = require('express');

function index() {
  return (req, res, next) => {
    req.api({as: 'user'}).users.get()
      .then(result => res.render('account/my-account', result))
      .catch(err => {
        if (err.name === 'HttpError' && err.code === 401) {
          // Unauthorized
          const queryParams = {return_uri: req.originalUrl};
          const login_url = `/oauth:login?${qs.stringify(queryParams)}`;
          res.render('account/no-account', {login_url});
        } else {
          next(err);
        }
      });
  };
}

const router = Router();

router.get('/', index());
module.exports = router;