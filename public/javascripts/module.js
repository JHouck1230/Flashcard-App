'use strict';

var app = angular.module('triviaApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('edit', {
    url: '/edit',
    templateUrl: '/html/edit.html',
    controller: 'editCtrl'
  })
  .state('play', {
    url: '/play/:category',
    templateUrl: '/html/play.html',
    controller: 'playCtrl'
  });
  $urlRouterProvider.otherwise('/edit');
});

app.run(function(TriviaFactory) {
  TriviaFactory.get();
  console.log('got em');
});

app.filter('unique', function() {
  return function(flashcards, arg) {
    if(!flashcards) flashcards = [];
    var categoriesArr = [];
    flashcards.forEach(function(card) {
      var category = card.category[0].toUpperCase() + card.category.slice(1).toLowerCase();
      if(categoriesArr.indexOf(card.category) === -1) {
        categoriesArr.push(card.category);
      }
    })
    return categoriesArr;
  }
});
