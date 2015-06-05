var groupApp = angular.module("groupApp", ['angularUtils.directives.dirPagination']);

groupApp.service('groupRepository', function ($http) {
    this.getGroups = function () {
        var url = "http://salesforce-python.pureprofile.com/getgroups";
        return $http.get(url);
    };
});

groupApp.controller('homeCtrl', function ($scope, groupRepository) {
    $scope.groupData = [];
    $scope.currentPage = 1;
    $scope.pageSize = 15;
    $scope.isdatafetching = true;

    groupRepository.getGroups().success(function (groupdata) {
        $scope.groupData = groupdata.groups;
        $scope.isdatafetching = false;
    });

    $scope.pageChangeHandler = function(num) {
        console.log('groups page changed to ' + num);
    };
});

groupApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});
