(function(){

angular.module('MenuCategoriesApp', [])
        .controller('MenuCategoriesController', MenuCategoriesController)
        .service('MenuCategoriesService', MenuCategoriesService)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

MenuCategoriesController.$inject = ['MenuCategoriesService'];
function MenuCategoriesController (MenuCategoriesService) {
    var menu = this;
    var promise = MenuCategoriesService.getMenuCategories();

    promise.then(function(response){
        menu.categories = response.data;
    }).catch(function(error){
        console.log("Something went terribly wrong: " + error);
    }); // fin de Promise 

    menu.logMenuItems = function (shortName){
        var promise = MenuCategoriesService.getMenuForCategory(shortName);

        promise.then(function(response){
            console.log(response.data);
        }).catch(function(error){
            console.log(error);
        });//fin de promise getMenuForCategory
    }; //fin de  menu.logMenuItems

} // fin de MenuCategoriesController


MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath){
    var service = this;

    service.getMenuCategories = function (){
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json")
        });
        return response;
    }; // fin del service getMenuCategories

    service.getMenuForCategory = function (shortName){
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
            params: {
                category : shortName
            }
        }); //fin del response
        return response;
    };//fin del getMenuCategories

} // fin de MenuCategoriesService

})();