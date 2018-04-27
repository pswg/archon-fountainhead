'use strict';

import { Router } from "express";
import { repo, owner } from "config/github/repo";
import { pullRequests } from "lib/github-api";

const router = Router();

function list(state) {
  return (req, res, next) => 
    pullRequests.getAll({ repo, owner, state })
      .then(result => { 
        result.data = result.data.filter(pr => pr.merged_at);
        res.render('lore/list', { state, ...result }); })
      .catch(err => { 
        next(err); });
}

function item() {
  return (req, res, next) => {
    const number = parseInt(req.params.number);

    return pullRequests.get({ number, repo, owner })
      .then(result => { res.render('lore/item', { number, ...result }); })
      .catch(err => { next(err); });
  };
}

router.get('/', list('closed'));
router.get('/:number', item());

export default router;