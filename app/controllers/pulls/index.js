'use strict';

import { Router } from "express";
import { repo, owner } from "config/github/repo";
import { pullRequests } from "lib/github-api";

const router = Router();

function list(state) {
  return (req, res, next) => 
    pullRequests.getAll({ repo, owner, state })
      .then(result => { res.render('pulls/list', { state, ...result }); })
      .catch(err => { next(err); });
}

function item() {
  return (req, res, next) => {
    const number = parseInt(req.params.number);

    return pullRequests.get({ number, repo: repo, owner })
      .then(result => { res.render('pulls/item', { number, ...result }); })
      .catch(err => { next(err); });
  };
}

function merge() {
  return (req, res, next) => {
    const number = parseInt(req.body.number);

    return pullRequests.get({ number, repo, owner })
      .then(({ data }) => {
        const title = `Merge pull request #${number} from ${data.head.label}`;
        const message = data.title;
        const sha = data.head.sha;

        return pullRequests.merge({
            repo, 
            owner,
            number,
            commit_title: title,
            commit_message: message,
            sha
          });
      })
      .then(result => { res.render('pulls/merged', { number, ...result }); })
      .catch(err => { next(err); });
  };
}

router.get('/', list('open'));
router.get('/closed', list('closed'));
router.get('/all', list('all'));

router.get('/:number', item());

router.post('/merge', merge());

export default router;