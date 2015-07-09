var webApp = angular.module("webApp", ['angularUtils.directives.dirPagination']);

webApp.config(["$provide", function ($provide) {
    $provide.decorator("$exceptionHandler", ["$delegate", function($delegate) {
        return function (exception, cause) {
            $rootScope.errorMessage = exception;
            $delegate(exception, cause);
        };
    }]);
}]);

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
    }).error(function(response) {
        $scope.errorMessage  = 'Internal Server Error [500], Try after some time';
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