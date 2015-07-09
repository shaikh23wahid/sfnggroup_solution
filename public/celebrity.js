var celApp = angular.module("celApp", ['angularUtils.directives.dirPagination']);

celApp.config(["$provide", function ($provide) {
    $provide.decorator("$exceptionHandler", ["$delegate", function($delegate) {
        return function (exception, cause) {
            $rootScope.errorMessage = exception;
            $delegate(exception, cause);
        };
    }]);
}]);

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
    }).error(function(response) {
        $scope.errorMessage  = 'Internal Server Error [500], Try after some time';
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
