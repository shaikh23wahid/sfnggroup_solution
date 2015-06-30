//angular module
var myTreeApp = angular.module('myTreeApp', ['angularTreeview']);


myTreeApp.service('sfcatRepository', function ($http) {
    this.getSalesForceCategories = function () {
        var url = "http://salesforce-python.pureprofile.com/salesforce/getcategoryhierarchy";
        return $http.get(url);
    };
});


//test controller
myTreeApp.controller('myController', function ($scope, sfcatRepository) {
    $scope.currentPage = 1;
    $scope.pageSize = 15;
    $scope.isdatafetching = true;

    sfcatRepository.getSalesForceCategories().success(function (categorydata) {
        $scope.categoryList = categorydata.categories;
        $scope.isdatafetching = false;
     });

    $scope.pageChangeHandler = function(num) {
        console.log('product category page changed to ' + num);
    };
});


myTreeApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});