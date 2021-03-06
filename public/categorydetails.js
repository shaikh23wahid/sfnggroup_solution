var categoryApp = angular.module("categoryApp", []);

categoryApp.service('categorydetailsRepository', function ($http) {
    this.getCategoryDetails = function (pcquename) {
        var url = "http://salesforce-python.pureprofile.com/getcategorydetails/" + pcquename ;
        return $http.get(url);
    };
});

categoryApp.controller('categoryCtrl', function ($scope, categorydetailsRepository) {
    $scope.categoryuniquename = categoryuniquename;
    $scope.categorydetails = {};
    $scope.isdatafetching = true;

    categorydetailsRepository.getCategoryDetails($scope.categoryuniquename).success(function (categoryData) {
        $scope.categorydetails = categoryData.category_details;
        $scope.isdatafetching = false;
    });
});