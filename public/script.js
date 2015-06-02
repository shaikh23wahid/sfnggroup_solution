var groupApp = angular.module("groupApp", ['angularUtils.directives.dirPagination']);

groupApp.service('groupRepository', function ($http) {
    this.getGroups = function () {
        var url = "http://52.74.171.222/getgroups";
        return $http.get(url);
    };
});

groupApp.controller('homeCtrl', function ($scope, groupRepository) {
    $scope.groupData = [];
    $scope.currentPage = 1;
    $scope.pageSize = 15;

    groupRepository.getGroups().success(function (groupdata) {
        $scope.groupData = groupdata.groups;
    });

    $scope.pageChangeHandler = function(num) {
        console.log('meals page changed to ' + num);
    };
});

groupApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});
