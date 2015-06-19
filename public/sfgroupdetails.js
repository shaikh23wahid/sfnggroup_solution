var sfgdApp = angular.module("sfgdApp", []);

sfgdApp.service('sfggroupdetailsRepository', function ($http) {
    this.getsfGroupDetails = function (sfgduname) {
        var url = "http://salesforce-python.pureprofile.com/salesforce/groupquestions/" + sfgduname ;
        return $http.get(url);
    };
});

sfgdApp.controller('sfgdCtrl', function ($scope, sfggroupdetailsRepository) {
    $scope.sfgroupuniquename = sfgroupuniquename;
    $scope.sfgroupdetails = {};
    $scope.isdatafetching = true;

    sfggroupdetailsRepository.getsfGroupDetails($scope.sfgroupuniquename).success(function (sfgroupData) {
        $scope.sfgroupdetails = sfgroupData.groupdetails;
        $scope.isdatafetching = false;
    });
});