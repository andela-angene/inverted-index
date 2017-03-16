

var myApp = angular.module('myApp', ['ngMessages']);

myApp.controller('mainController', ['$scope', '$log', '$filter', '$timeout', function($scope, $log, $filter, $timeout) {
  
  $scope.name = 'tony';
  $scope.showAll = false;
  $scope.files = [];
  $scope.search = {check: false}
  $scope.masterDB = {files: []};
  $scope.getIndex = (file) => {
    $scope.search.check = false;
    $scope.showAll = false;
    $scope.indexed = $scope.masterDB[file];
  }
  $scope.searchOnEnter = (event, word) => {
    if (event.which === 13 && word){
      $scope.searchIndex(word);
    }
  }
  $scope.indexed = {totalBooks: []};
  $scope.verify = (check) => {
    if (check) return 'T';
    return 'X';
  }
  $scope.indexAll = () => {
    $scope.search.check = false;
    $scope.showAll = true;
    $scope.indexed = $scope.masterDB;
  }
  $scope.searchIndex = (word) => {
    if (word.length < 1) return;
      $scope.search.keys = InvertedIndex.tokenize(word);
      $scope.search.check = true;
  }

  const index = new InvertedIndex();

  let fileInput = $('#fileInput'),
      displayArea = $('fileDisplayArea');

  fileInput.on('change', () => {
    var promise = new Promise((resolve, reject) => {
      InvertedIndex.readFile(fileInput, index.database, resolve);
    });
    promise.then((database) => {
      let filename = fileInput[0].files[0].name;
      $scope.$apply(() => {
        if ($scope.masterDB.files.indexOf(filename) !== -1) {
          console.log('file already exists');
          return;
        }
        $scope.showAll = false;
        $scope.search.check = false;
        $scope.masterDB.files.push(filename);
        $scope.indexed = database;
        $scope.masterDB[filename] = database;
        $scope.name = 'added';
      })
    }).catch(() => {
      console.log('Something went wrong.');
    });
  });
  
}]);

