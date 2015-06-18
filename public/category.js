var bootstrapApp = angular.module("bootstrapApp", []);

bootstrapApp.service('catRepository', function ($http) {
    this.getcategories = function () {
        var url = "http://salesforce-python.pureprofile.com/getcategories";
        return $http.get(url);
    };

    this.getchildcategories = function () {
        var url = "http://salesforce-python.pureprofile.com/getcategories";
        return $http.get(url);
    };
});

bootstrapApp.controller('cat100Ctrl', function ($scope, catRepository) {
    $scope.categories = [];
    $scope.topCategories = [];
    $scope.childCategories = [];

    $scope.showModal = false;
    $scope.categoryhierarchy = '';

    $scope.toggleModal = function(catid, cathierarchy){
        var childfilteredlist  = _.where($scope.categories, {parent_category_id: catid});
        $scope.childCategories = childfilteredlist;
        $scope.categoryhierarchy  = cathierarchy;
        $scope.showModal = !$scope.showModal;
    };

    $scope.refreshchildCategory= function(catid, cathierarchy) {
        $scope.childCategories=[];
        var childfilteredlist  = _.where($scope.categories, {parent_category_id: catid});
        $scope.childCategories = childfilteredlist;
        $scope.categoryhierarchy  = cathierarchy;
    }

    catRepository.getcategories().success(function (categorydata) {
        $scope.categories = categorydata.categories;
        var filteredlist  = _.where($scope.categories, {hierarychy_level: 1});
        $scope.topCategories = filteredlist;
    });

    $scope.showchildcategories = function(catid) {
            var childfilteredlist  = _.where($scope.categories, {parent_category_id: catid});
            $scope.childCategories = childfilteredlist;
    };
});

bootstrapApp.directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">{{ categoryhierarchy }}</h4>' +
        '</div>' +
        '<div class="modal-body" ng-transclude></div>' +
        '</div>' +
        '</div>' +
        '</div>',
        restrict: 'E',
        transclude: true,
        replace:true,
        scope:true,
        link: function postLink(scope, element, attrs) {
            scope.$watch(attrs.visible, function(value){
                if(value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});
