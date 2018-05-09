'use strict';

const {Router} = require('express');

function index() {
  return (req, res, next) => {
    req.api({as: 'user'}).users.get()
      .then(result => res.render('account/my-account', result))
      .catch(err => {
        if (err.name === 'HttpError' && err.code === 401) {
          res.render('account/no-account');
        } else {
          next(err);
        }
      });
  };
}

const router = Router();

router.get('/', index());
module.exports = router;