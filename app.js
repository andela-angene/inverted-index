var myApp = angular.module('myApp', ['ngMessages']);

myApp.controller('mainController', ['$scope', '$log', '$filter', '$timeout', function($scope, $log, $filter, $timeout) {
  
  $scope.masterIndex = new InvertedIndex();

  let fileInput = $('#fileInput');

  fileInput.on('change', () => {
    var promise = new Promise((resolve, reject) => {
      InvertedIndex.readFile(fileInput, resolve);
    });
    promise.then((database) => {
      let filename = fileInput[0].files[0].name;
      $scope.$apply(() => {
        if ($scope.masterIndex.files.indexOf(filename) !== -1) {
          console.log('file already exists');
          return;
        }
        $scope.masterIndex.indexFile(filename, database);
        console.log($scope.masterIndex);
      })
    }).catch(() => {
      console.log('Something went wrong.');
    });
  });
  
}]);