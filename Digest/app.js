(function(){
    'use strict';

    angular.module('CounterApp', [])
            .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope'];
    function CounterController($scope){
        
        $scope.onceCounter = 0;
        $scope.counter = 0;

        $scope.showNumberOfWatchers = function () {
            console.log("# of Watchers: " + $scope.$$watchersCount);
        };   

        $scope.countOnce = function(){
            $scope.onceCounter = 1;
        }; 

        $scope.upCounter = function(){
            $scope.counter++;
        };

        // $scope.$watch('onceCounter', function(newVal, oldVal){
        //     console.log("once old value: ", oldVal);
        //     console.log("once new value", newVal);
        // });

        // $scope.$watch('counter', function(newVal, oldVal){
        //     console.log("counter old value: ", oldVal);
        //     console.log("counter new value", newVal);
        // });

    }

})();