 var brandApp = angular.module("brandApp", []);

 brandApp.service('brandRepository', function ($http) {
     this.getBrandDetails = function (branduniquename) {
         var url = "http://salesforce-python.pureprofile.com/getbranddetails/" + branduniquename ;
         return $http.get(url);
     };
 });

 brandApp.controller('brandCtrl', function ($scope, brandRepository) {
     $scope.Branduniquname = branduniquename;
     $scope.branddetails = {};
     $scope.isdatafetching = false;

     /*
     brandRepository.getBrandDetails($scope.Branduniquname).success(function (branddata) {
         $scope.branddetails = branddata.brand;
         $scope.isdatafetching = false;
     });
     */
 });