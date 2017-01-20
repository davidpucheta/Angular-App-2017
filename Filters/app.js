(function(){
    'use strict';

    angular.module('MsgApp', ['ngRoute'])
            .controller('MsgController', MsgController);

    MsgController.$inject = ['$scope', '$filter'];
    function MsgController($scope, $filter){
        $scope.name = "David";
        $scope.stateOfBeing = "hungry";
        $scope.cookieCost = .45;

        $scope.sayMessage = function () {
            var msg = "Eat healthy snacks at night";
            var output = $filter('uppercase')(msg);
            return output;
        };

        $scope.feedDavid = function(){
            $scope.stateOfBeing = "fed";
        };
    }


})();