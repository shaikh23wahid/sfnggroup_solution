var webApp = angular.module("webApp", ['angularUtils.directives.dirPagination']);

webApp.service('websitesRepository', function ($http) {
    this.getAllWebsite = function () {
        var url = "http://salesforce-python.pureprofile.com/getallwebsite";
        return $http.get(url);
    };
});

webApp.controller('websiteCtrl', function ($scope, websitesRepository) {
    $scope.websites = [];

    $scope.currentPage = 1;
    $scope.pageSize = 15;
    $scope.isdatafetching = true;

    websitesRepository.getAllWebsite().success(function (websitedata) {
        $scope.websites = websitedata.webstites;
        $scope.isdatafetching = false;
    });

    $scope.pageChangeHandler = function(num) {
        console.log('product category page changed to ' + num);
    };
});

webApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});