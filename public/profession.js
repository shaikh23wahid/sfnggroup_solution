var profApp = angular.module("profApp", ['angularUtils.directives.dirPagination']);

profApp.service('professionRepository', function ($http) {
    this.getProfessions = function () {
        var url = "http://salesforce-python.pureprofile.com/getprofessions";
        return $http.get(url);
    };
});

profApp.controller('professionCtrl', function ($scope, professionRepository) {
    $scope.professions = [];
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.isdatafetching = true;

    professionRepository.getProfessions().success(function (professiondata) {
        $scope.professions = professiondata.professions;
        $scope.isdatafetching = false;
    });

    $scope.pageChangeHandler = function(num) {
        console.log('profession page changed to ' + num);
    };
});

profApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});
