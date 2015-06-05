var pcApp = angular.module("pcApp", ['angularUtils.directives.dirPagination']);

pcApp.service('productcategoryRepository', function ($http) {
    this.getProductCategories = function () {
        var url = "http://salesforce-python.pureprofile.com/getproductcategories";
        return $http.get(url);
    };
});

pcApp.controller('pcCtrl', function ($scope, productcategoryRepository) {
    $scope.productCategories = [];
    $scope.currentPage = 1;
    $scope.pageSize = 15;
    $scope.isdatafetching = true;

    productcategoryRepository.getProductCategories().success(function (productcategoriesdata) {
        $scope.productCategories = productcategoriesdata.productcategories;
        $scope.isdatafetching = false;
    });

    $scope.pageChangeHandler = function(num) {
        console.log('product category page changed to ' + num);
    };
});

pcApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});
