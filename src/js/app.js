const myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', ($scope) => {
  $scope.message = 'Hello World!';
}]);
