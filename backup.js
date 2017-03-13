'use strict'

var myApp = angular.module('myApp', ['ngMessages']);

myApp.controller('mainController', ['$scope', '$log', '$filter', '$timeout', function($scope, $log, $filter, $timeout) {
  $scope.name = $filter('uppercase')('anthony');

  $scope.twitter = "Jack"
  $scope.lower = function (){
    return $filter('lowercase')($scope.twitter);
  }
  $timeout(function(){
    $scope.name = 'V!!';
  }, 2000);

  $scope.maxC = 6;

  $scope.rules = [
    { name: 'Must be 5 characters' },
    { name: 'Must be awesome' },
    { name: 'Must be 6 characters' },
    { name: 'Must be cool' },
  ]

  //  $scope.$watch('twitter', function(newV, oldV){
  //    $log.log(oldV);
  //    $log.log(newV);
  //  })

  // setTimeout(function(){
  //   $scope.$apply(function(){
  //     console.log('done')
  //     $scope.twitter = 'lkjdsflkjfslkdjsdjfdjsfjlsjdfks';
  //   })
  // }, 3000)



}]);