var pcApp = angular.module("pcApp", ['angularUtils.directives.dirPagination']);

pcApp.config(["$provide", function ($provide) {
    $provide.decorator("$exceptionHandler", ["$delegate", function($delegate) {
        return function (exception, cause) {
            $rootScope.errorMessage = exception;
            $delegate(exception, cause);
        };
    }]);
}]);

pcApp.service('productcategoryRepository', function ($http) {
    this.getProductCategories = function () {
        var url = "http://salesforce-python.pureprofile.com/getproductcategories";
        return $http.get(url);
    };
});

pcApp.controller('pcCtrl', function ($scope, productcategoryRepository) {
    $scope.productCategories = [];
    $scope.currentPage = 1;
    $scope.pageSize = 12;
    $scope.isdatafetching = true;

    productcategoryRepository.getProductCategories().success(function (productcategoriesdata) {
        $scope.productCategories = productcategoriesdata.productcategories;
        $scope.isdatafetching = false;
    }).error(function(response) {
        $scope.errorMessage  = 'Internal Server Error [500], Try after some time';
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
