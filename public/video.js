var vdoApp = angular.module("vdoApp", ['angularUtils.directives.dirPagination']);

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