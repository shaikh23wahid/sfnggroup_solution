var gdApp = angular.module("brandsApp", []);

gdApp.service('groupRepository', function ($http) {

    this.getGroupDetails = function (pcquename) {
         var url = "http://salesforce-python.pureprofile.com/getproductcategorybrands/" + pcquename ;
        return $http.get(url);
    };
});

gdApp.controller('brandsCtrl', function ($scope, groupRepository) {
    $scope.productCategoryUniquname = pcuname;
    $scope.productcategorydetails = {};
    $scope.isdatafetching = true;

    groupRepository.getGroupDetails($scope.productCategoryUniquname).success(function (productCategoryData) {
        $scope.productcategorydetails = productCategoryData.productcategory;
        $scope.isdatafetching = false;
    });
});