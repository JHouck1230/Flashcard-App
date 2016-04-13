'use strict';

var app = angular.module('triviaApp');

app.factory('TriviaFactory', function($http) {

  var data = [];

  function get() {
    $http.get('/flashcards')
    .then(function(res) {
      data = res.data;
      return data;
    }, function(err) {
      console.error('err: ', err);
    })
  }; //end getCards()

  function create(flashcard) {
    data.push(angular.copy(flashcard));
    return $http.post('/flashcards', flashcard);
  }; //end addCard()

  function remove(flashcard){
    var id = flashcard.id;
    return $http.delete(`/flashcards/${id}`, flashcard);
  }

  function update(flashcard){
    var id = flashcard.id;
    delete flashcard['editing'];
    return $http.put(`/flashcards/${id}`, flashcard);
  }

  function grabData(){
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
