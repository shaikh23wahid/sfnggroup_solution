var bootstrapApp = angular.module("bootstrapApp", ['angularUtils.directives.dirPagination']);

bootstrapApp.config(["$provide", function ($provide) {
    $provide.decorator("$exceptionHandler", ["$delegate", function($delegate) {
        return function (exception, cause) {
            $rootScope.errorMessage = exception;
            $delegate(exception, cause);
        };
    }]);
}]);

bootstrapApp.service('questionRepository', function ($http) {
    this.getAllQuestions = function () {
        var url = "http://salesforce-python.pureprofile.com/getallquestions";
        return $http.get(url);
    };
});

bootstrapApp.controller('questionCtrl', function ($scope, questionRepository) {
    $scope.questions = [];

    $scope.currentPage = 1;
    $scope.pageSize = 15;
    $scope.isdatafetching = true;

    questionRepository.getAllQuestions().success(function (questiondata) {
        $scope.questions = questiondata.questions;
        $scope.isdatafetching = false;
    }).error(function(response) {
        $scope.errorMessage  = 'Internal Server Error [500], Try after some time';
        $scope.isdatafetching = false;
    });

    $scope.pageChangeHandler = function(num) {
        console.log('product category page changed to ' + num);
    };
});

bootstrapApp.controller('OtherController', function ($scope) {
    $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
    };
});