(function () {
    'use strict';

    angular.module('MsgApp', [])
        .controller('MsgController', MsgController);

    MsgController.$inject = [$scope];

    function MsgController($scope) {
        $scope.name = "David";

        $scope.sayMessage = function(){
            return "David likes to eat peanuts at midnight";
        };

    }
})();