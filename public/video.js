var vdoApp = angular.module("vdoApp", ['angularUtils.directives.dirPagination']);

vdoApp.config(["$provide", function ($provide) {
    $provide.decorator("$exceptionHandler", ["$delegate", function($delegate) {
        return function (exception, cause) {
            $rootScope.errorMessage = exception;
            $delegate(exception, cause);
        };
    }]);
}]);

vdoApp.service('videoRepository', function ($http) {
    this.getAllVideo = function () {
        var url = "http://salesforce-python.pureprofile.com/getallvideo";
        return $http.get(url);
    };
});

vdoApp.controller('videoCtrl', function ($scope, videoRepository) {
    $scope.videos = [];

    $scope.currentPage = 1;
    $scope.pageSize = 15;
    $scope.isdatafetching = true;

    videoRepository.getAllVideo().success(function (vdodata) {
        $scope.videos = vdodata.videos;
        $scope.isdatafetching = false;
    }).error(function(response) {
        $scope.errorMessage  = 'Internal Server Error [500], Try after some time';
        $scope.isdatafetching = false;
    });


    $scope.pageChangeHandler = function(num) {
        console.log('product category page changed to ' + num);
    };
});

vdoApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});