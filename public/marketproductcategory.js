var mpcApp = angular.module("mpcApp", ['angularUtils.directives.dirPagination']);

mpcApp.config(["$provide", function ($provide) {
    $provide.decorator("$exceptionHandler", ["$delegate", function($delegate) {
        return function (exception, cause) {
            $rootScope.errorMessage = exception;
            $delegate(exception, cause);
        };
    }]);
}]);

mpcApp.service('mpcRepository', function ($http) {
    this.getMarketProductCategory = function () {
        var url = "http://salesforce-python.pureprofile.com/getmarketproductcategory";
        return $http.get(url);
    };
});

mpcApp.controller('mpcCtrl', function ($scope, mpcRepository) {
    $scope.mpcategories = [];

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.isdatafetching = true;

    mpcRepository.getMarketProductCategory().success(function (mpcdata) {
        $scope.mpcategories = mpcdata.market_product_category;
        $scope.isdatafetching = false;
    }).error(function(response) {
        $scope.errorMessage  = 'Internal Server Error [500], Try after some time';
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