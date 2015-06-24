var celApp = angular.module("celApp", ['angularUtils.directives.dirPagination']);

celApp.service('celebrityRepository', function ($http) {
    this.getCelebrities = function () {
        var url = "http://salesforce-python.pureprofile.com/getcelebrities";
        return $http.get(url);
    };
});

celApp.controller('celebrityCtrl', function ($scope, celebrityRepository) {
    $scope.celebrities = [];
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.isdatafetching = true;

    celebrityRepository.getCelebrities().success(function (celebritiesdata) {
        $scope.celebrities = celebritiesdata.celebrities;
        $scope.isdatafetching = false;
    });

    $scope.pageChangeHandler = function(num) {
        console.log('celebrity page changed to ' + num);
    };
});

celApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});
