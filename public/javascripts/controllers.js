'use strict';

var app = angular.module('triviaApp');

app.controller('editCtrl', function($scope, TriviaFactory) {

  TriviaFactory.get();//end get

  populateCards();
  function populateCards(){
    $scope.creating = false;
    var data = TriviaFactory.grabData();
    $scope.flashcards = data;
  };

  function checkCategory (){
    var flashcards = $scope.flashcards;
    if(!flashcards) flashcards = [];
    var categoriesArr = [];
    flashcards.forEach(function(card) {
      var category = card.category[0].toUpperCase() + card.category.slice(1).toLowerCase();
      if(categoriesArr.indexOf(card.category) === -1) {
        categoriesArr.push(card.category);
      }
    });
    if (categoriesArr.length > 7 && categoriesArr.indexOf($scope.flashcard.category) === -1 ){
      return true;
    } else {
      return false;
    }

  }; //end checkCategory()


    $scope.addNewCard = function(){
      $scope.creating = true;
    }
  $scope.createCard = function() {
    if (checkCategory()) {
      return;
    }
    $scope.creating = false;
    TriviaFactory.create($scope.flashcard)
      .then(function(res) {
        
        var flashcardCopy = angular.copy($scope.flashcard);
        $scope.flashcards.unshift(flashcardCopy);
        $scope.flashcard.category = "";
        $scope.flashcard.question = "";
        $scope.flashcard.answer = "";
      }, function(err) {
        console.error('err: ', err);
      })
    } // end createCard

  $scope.removeCard = function(flashcard) {
      TriviaFactory.remove(flashcard)
        .then(function(res) {
          var index = $scope.flashcards.indexOf(flashcard);
          $scope.flashcards.splice(index, 1);
        }, function(err) {
          console.error("error", err);
        });
    } // end removeCard();



  $scope.editCard = function(flashcard) {
    flashcard.editing = true;
  }; //end editCard


  $scope.saveCard = function(flashcard) {
      flashcard.editing = false;
      TriviaFactory.update(flashcard)
        .then(function(res) {
        }, function(err) {
          console.error('err: ', err);
        });
    } //end saveCard
}); //end editCtrl


app.controller('playCtrl', function($scope, TriviaFactory){

  var randomCardArr = [];
  $scope.i = 0;
  $scope.showCard = false;

  $scope.filterCategory = function(category) {
    $scope.showCard = true;
    $scope.showAnswer = false;
    $scope.flipped = false;
    TriviaFactory.getCategory(category)
    .then(function(res){
      randomCardArr = _.shuffle(res.data);
      $scope.quizCards = randomCardArr;
    }, function(err){
      console.error("getCategory err:", err);
    });
  }

  $scope.goBack = function(){
    $scope.showAnswer = false;
    if ($scope.i===0){
      $scope.i = randomCardArr.length-1;
    } else {
      $scope.i --;
    }
  }

  $scope.goNext = function(){
    $scope.showAnswer = false;
    if ($scope.i===randomCardArr.length-1){
      $scope.i = 0;
    } else {
      $scope.i ++;
    }
  }

  $scope.revealCard = function(){
    $scope.showAnswer = true;
  }

  $scope.flashcards = TriviaFactory.grabData();
}); //end playCtrl
