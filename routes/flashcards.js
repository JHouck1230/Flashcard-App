'use strict';

var express = require('express');
var router = express.Router();

var db = require('../config/db');

router.get('/', function(req, res, next){

  db.query('SELECT * FROM flashcards', function(err, flashcards, fields){
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.send(flashcards);
  }); //end query

}); //end get

router.get('/:cat', function(req, res){
  var category = req.params.cat;
  db.query(`SELECT * FROM flashcards WHERE category = '${category}'`, function(err, flashcards){
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.send(flashcards);
  });
}); //end get category

router.post('/', function(req, res){
  db.query('INSERT INTO flashcards SET ?', req.body, function(err, result){
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.send(result);
  }); //end query
}); //end post

router.delete('/:id', function(req, res){
  db.query('DELETE FROM flashcards WHERE id=?', req.params.id, function(err, result){
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.send();
  }); //end query
}); //end delete

router.put('/:id', function(req, res){
  var id = req.params.id;
  db.query(`UPDATE flashcards SET ? WHERE id = ${id}`, req.body, function(err, result){
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.send(result);
  }); //end query
}); //end put


module.exports = router;
