var mpcApp = angular.module("mpcApp", ['angularUtils.directives.dirPagination']);

mpcApp.service('mpcRepository', function ($http) {
    this.getMarketProductCategory = function () {
        var url = "http://salesforce-python.pureprofile.com/getmarketproductcategory";
        return $http.get(url);
    };
});

mpcApp.controller('mpcCtrl', function ($scope, mpcRepository) {
    $scope.mpcategories = [];

    $scope.currentPage = 1;
    $scope.pageSize = 15;
    $scope.isdatafetching = true;

    mpcRepository.getMarketProductCategory().success(function (mpcdata) {
        $scope.mpcategories = mpcdata.market_product_category;
        $scope.isdatafetching = false;
    });

    $scope.pageChangeHandler = function(num) {
        console.log('product category page changed to ' + num);
    };
});

mpcApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});