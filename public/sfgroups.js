var sfgroupsApp = angular.module("sfgroupsApp", ['angularUtils.directives.dirPagination']);

sfgroupsApp.config(["$provide", function ($provide) {
    $provide.decorator("$exceptionHandler", ["$delegate", function($delegate) {
        return function (exception, cause) {
            $rootScope.errorMessage = exception;
            $delegate(exception, cause);
        };
    }]);
}]);

sfgroupsApp.service('sfgroupsRepository', function ($http) {
    this.getsalesforcegroups = function () {
        var url = "http://salesforce-python.pureprofile.com/salesforce/groups";
        return $http.get(url);
    };
});

sfgroupsApp.controller('sfgroupsCtrl', function ($scope, sfgroupsRepository) {
    $scope.sfGroups = [];

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.isdatafetching = true;

    sfgroupsRepository.getsalesforcegroups().success(function (sfgroupsdata) {
        $scope.sfGroups = sfgroupsdata.groups;
        $scope.isdatafetching = false;
    }).error(function(response) {
       $scope.errorMessage  = 'Internal Server Error [500], Try after some time';
        $scope.isdatafetching = false;
    });

    $scope.pageChangeHandler = function(num) {
        console.log('product category page changed to ' + num);
    };
});


sfgroupsApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});
