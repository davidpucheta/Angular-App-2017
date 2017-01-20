(function(){
    'use strict';

    angular.module('MsgApp', ['ngRoute'])
            .controller('MsgController', MsgController)
            .filter('loves', LovesFilter)
            .filter('truth', TruthFilter);

    MsgController.$inject = ['$scope', '$filter', 'lovesFilter', 'truthFilter' ];
    function MsgController($scope, $filter, lovesFilter, truthFilter){
        $scope.name = "David";
        $scope.stateOfBeing = "hungry";
        $scope.cookieCost = .45;

        $scope.sayMessage = function () {
            var msg = "likes to eat healthy snacks at night";
            var output = $filter('uppercase')(msg);
            return output;
        };

        $scope.feedDavid = function(){
            $scope.stateOfBeing = "fed";
        };

        $scope.sayLovesMessage = function () {
            var msg = "likes to eat healthy snacks at night";
            msg = lovesFilter(msg);
            return msg;
        };
    }

    function LovesFilter() {
        return function(input){
            input = input || "";
            input = input.replace("likes","loves");
            return input;
        };
    }

    function TruthFilter(){
        return function(input, target, replace){
            input = input || "";
            input = input.replace(target,replace);
            return input;
        };
    }


})();