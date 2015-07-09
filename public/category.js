var bootstrapApp = angular.module("bootstrapApp", ['angularUtils.directives.dirPagination']);

bootstrapApp.config(["$provide", function ($provide) {
    $provide.decorator("$exceptionHandler", ["$delegate", function($delegate) {
        return function (exception, cause) {
            $rootScope.errorMessage = exception;
            $delegate(exception, cause);
        };
    }]);
}]);

bootstrapApp.service('catRepository', function ($http) {
    this.getCategories = function () {
        var url = "http://salesforce-python.pureprofile.com/getcategories";
        return $http.get(url);
    };
});

bootstrapApp.controller('categoryCtrl', function ($scope, catRepository) {
    $scope.filteredCategories = [];
    $scope.categories = [];

    $scope.currentPage = 1;
    $scope.pageSize = 15;
    $scope.isdatafetching = true;

    catRepository.getCategories().success(function (categorydata) {
        $scope.categories = categorydata.categories;
        $scope.filteredCategories = categorydata.categories;
        $scope.isdatafetching = false;
    }).error(function(response) {
        $scope.errorMessage  = 'Internal Server Error [500], Try after some time';
        $scope.isdatafetching = false;
    });

    $scope.filtercategory = function(searchText){
        if(searchText != undefined && searchText!='') {
            var filtereddata = _.filter($scope.filteredCategories, function (item) {
                return item.category_text == searchText || item.total_child == searchText;
            })

            $scope.categories = filtereddata;
        }

       return  $scope.categories;
    }

    $scope.pageChangeHandler = function(num) {
        console.log('product category page changed to ' + num);
    };
});

bootstrapApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});