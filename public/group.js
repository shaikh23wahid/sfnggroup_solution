var gdApp = angular.module("gdApp", []);

gdApp.service('groupRepository', function ($http) {

    this.getGroupDetails = function (groupuniquename) {
        //var url = "http://52.74.171.222/getgroupdetails/" + groupuniquename ;
        var url = "http://salesforce-python.pureprofile.com/getgroupdetails/" + groupuniquename ;
        return $http.get(url);
    };
});

gdApp.controller('groupCtrl', function ($scope, groupRepository) {
    $scope.Groupuniquname = groupuniqued;
    $scope.groupdetails = {};
    $scope.isdatafetching = true;

    groupRepository.getGroupDetails($scope.Groupuniquname).success(function (groupdata) {
        $scope.groupdetails = groupdata.group;
        $scope.isdatafetching = false;
    });
});