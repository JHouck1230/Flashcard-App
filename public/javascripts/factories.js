'use strict';

var app = angular.module('triviaApp');

app.factory('TriviaFactory', function($http) {

  var data = [];

  function get() {
    $http.get('/flashcards')
    .then(function(res) {
      data = res.data;
      console.log('res.data: ', data);
      return data;
    }, function(err) {
      console.error('err: ', err);
    })
  }; //end getCards()

  function create(flashcard) {
    console.log('create flashcard: ', flashcard);
    data.push(angular.copy(flashcard));
    return $http.post('/flashcards', flashcard);
  }; //end addCard()

  function remove(flashcard){
    console.log("flashcard.id", flashcard.id);
    var id = flashcard.id;
    return $http.delete(`/flashcards/${id}`, flashcard);
  }

  function update(flashcard){

    console.log("flashcard.id update", flashcard.id);
    console.log("flashcard update", flashcard);

    var id = flashcard.id;
    return $http.put(`/flashcards/${id}`, flashcard);
  }

  function grabData(){
    console.log("data factory", data);
    return data;
  }

  function getCategory(category){
    return $http.get(`/flashcards/${category}`);
  }

  return {
    get: get,
    create: create,
    remove: remove,
    update: update,
    grabData: grabData,
    getCategory: getCategory
  }
}); // end factory
