var bootstrapApp = angular.module("bootstrapApp", ['angularUtils.directives.dirPagination']);

bootstrapApp.service('catRepository', function ($http) {
    this.getCategories = function () {
        var url = "http://salesforce-python.pureprofile.com/getcategories";
        return $http.get(url);
    };
});

bootstrapApp.controller('categoryCtrl', function ($scope, catRepository) {
    $scope.categories = [];

    $scope.currentPage = 1;
    $scope.pageSize = 15;
    $scope.isdatafetching = true;

    catRepository.getCategories().success(function (categorydata) {
        $scope.categories = categorydata.categories;
        $scope.isdatafetching = false;
    });

    $scope.pageChangeHandler = function(num) {
        console.log('product category page changed to ' + num);
    };
});

bootstrapApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});