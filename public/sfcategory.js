var bootstrapsfApp = angular.module("bootstrapsfApp", ['angularUtils.directives.dirPagination']);

bootstrapsfApp.service('sfcatRepository', function ($http) {
    this.getSalesForceCategories = function () {
        var url = "http://salesforce-python.pureprofile.com/salesforce/getcategoryhierarchy";
        return $http.get(url);
    };
});

bootstrapsfApp.controller('sfcategoryCtrl', function ($scope, sfcatRepository) {
    $scope.filteredCategories = [];
    $scope.categories = [];

    $scope.currentPage = 1;
    $scope.pageSize = 15;
    $scope.isdatafetching = true;

    sfcatRepository.getSalesForceCategories().success(function (categorydata) {
        $scope.categories = categorydata.categories;

        $scope.filteredCategories =_.filter($scope.categories, function (item) {
            return item.category_level == 1;
        })

        $scope.isdatafetching = false;
    });

    $scope.showchild =function(catid){
        alert(catid);
    }

    $scope.pageChangeHandler = function(num) {
        console.log('product category page changed to ' + num);
    };
});

bootstrapsfApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});