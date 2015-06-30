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

    $scope.breadcrumbs = [
        {
            catname : "About You",
            uname:"about-you"
        },
        {
            catname : "Pets",
            uname:"pets"
        },
        {
            catname : "Pet Insurance",
            uname:"pet-insurance"
        },
        {
            catname : "Pet Insurance2",
            uname:"pet-insurance2"
        },
        {
            catname : "Pet Insurance3",
            uname:"pet-insurance3"
        }
    ];

    categorydetailsRepository.getCategoryDetails($scope.categoryuniquename).success(function (categoryData) {
        $scope.categorydetails = categoryData.category_details;
        $scope.isdatafetching = false;
    });
});