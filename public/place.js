var placeApp = angular.module("placeApp", ['angularUtils.directives.dirPagination']);

placeApp.service('placeRepository', function ($http) {
    this.getAllPlace = function () {
        var url = "http://salesforce-python.pureprofile.com/getallplace";
        return $http.get(url);
    };
});

placeApp.controller('placeCtrl', function ($scope, placeRepository) {
    $scope.places = [];

    $scope.currentPage = 1;
    $scope.pageSize = 15;
    $scope.isdatafetching = true;

    placeRepository.getAllPlace().success(function (placedata) {
        $scope.places = placedata.places;
        $scope.isdatafetching = false;
    });

    $scope.pageChangeHandler = function(num) {
        console.log('product category page changed to ' + num);
    };
});

placeApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});