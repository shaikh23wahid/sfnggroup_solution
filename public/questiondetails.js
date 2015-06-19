var questiondetailsApp = angular.module("questiondetailsApp", []);

questiondetailsApp.service('questiondetailsRepository', function ($http) {
    this.getQuestionDetails = function (qiestionid) {
        var url = "http://salesforce-python.pureprofile.com/getquestiondetails/" + qiestionid ;
        return $http.get(url);
    };
});

questiondetailsApp.controller('qdCtrl', function ($scope, questiondetailsRepository) {
    $scope.questionid = qid;
    $scope.questiondetails = {};
    $scope.isdatafetching = true;

    questiondetailsRepository.getQuestionDetails($scope.questionid).success(function (questionData) {
        $scope.questiondetails = questionData.question;
        $scope.isdatafetching = false;
    });
});