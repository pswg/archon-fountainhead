'use strict';

const express = require('express');
const repo = require$('config/github/repo');
const api = require$('lib/github-api');

const router = express.Router();

function sortByMergeDate(left,right){
  const aMergeDate = Date.parse(a.merged_at);
  const bMergeDate = Date.parse(b.merged_at);
  if( aMergeDate < bMergeDate)
    return -1;
  else if (aMergeDate > bMergeDate)
    return 1;
  else 
    return 0; 
}

function list() {
  return (req, res, next) => 
    api.pullRequests.getAll({
        repo: repo.repo,
        owner: repo.owner,
        state: 'closed'
      })
      .then(result => { 
        result.data = result.data
          .filter(pr => pr.merged_at)
          .sort(sortByMergeDate);
        res.render('lore/list', { ...result}); })
      .catch(err => { 
        next(err); });
}

function item() {
  return (req, res, next) => {
    const number = parseInt(req.params.number);

    return api.pullRequests.get({
        number,
        repo: repo.repo,
        owner: repo.owner,
      })
      .then(result => { res.render('lore/item', {number, ...result}); })
      .catch(err => { next(err); });
  };
}

router.get('/', list());
router.get('/:number', item());

module.exports = router;