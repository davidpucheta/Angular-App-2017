(function() {
'use strict';

angular.module('ShoppingListDirectiveApp', [])
    .controller('ShoppingListController1', ShoppingListController1)
    .controller('ShoppingListController2', ShoppingListController2)
    .factory('ShoppingListFactory', ShoppingListFactory)
    .directive('shoppingList', ShoppingListDirective);


function ShoppingListDirective(){
    var ddo = {
        templateUrl: 'shoppingList.html',
        scope: {
            items: '<',
            title: '@'
        },
        controller: ShoppingListDirectiveController,
        controllerAs: 'list',
        bindToController: true
    };
    return ddo;
}

function ShoppingListDirectiveController() {
  var list = this;

  list.cookiesInList = function () {
    for (var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };
}



//List 1 controller
ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1 (ShoppingListFactory) {
    var list = this;
    
  //use factory to create ShoppingList srvice
  var ShoppingList = ShoppingListFactory();

  list.items = ShoppingList.getItems();

  var origTitle = "Shopping List #1";
  list.title = origTitle + " (" + list.items.length + " items )";

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function(){
      ShoppingList.addItem(list.itemName, list.itemQuantity);
      list.title = origTitle + " (" + list.items.length + " items )";
  };

  list.removeItem = function(itemIndex){
      ShoppingList.removeItem(itemIndex);
      list.title = origTitle + " (" + list.items.length + " items )";
  };
}

ShoppingListController2.$inject = ['ShoppingListFactory']
function ShoppingListController2(ShoppingListFactory) {
    var list = this;
    //use factory to create ShoppingList srvice
    var ShoppingList = ShoppingListFactory(3);

    list.items = ShoppingList.getItems();

    var origTitle = "Shopping List #2";
    list.title = origTitle + " (" + list.items.length + " items )";

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function(){
        try{
             ShoppingList.addItem(list.itemName, list.itemQuantity);
             list.title = origTitle + " (" + list.items.length + " items )";
        } catch (error) {
            list.errorMessage = error.message;
        }
    };

    list.removeItem = function(itemIndex){
        ShoppingList.removeItem(itemIndex);
        list.title = origTitle + " (" + list.items.length + " items )";
    };

}

function ShoppingListService(maxItems) {
    var service = this;

    //list of shopping items
    var items = [];

    service.addItem = function(itemName, quantity){
        if ((maxItems === undefined) ||
            (maxItems !== undefined ) && (items.length < maxItems)){
            
            var item = {
                name: itemName,
                quantity: quantity
            };

            items.push(item);
        } else {
            throw new Error("Max items (" + maxItems + ") reached.");
        }
        
       
    };

    service.getItems = function(){
        return items;
    };

    service.removeItem = function(itemIndex){
        items.splice(itemIndex, 1);
    };
}

function ShoppingListFactory(){
    var factory = function(maxItems){
        return new ShoppingListService(maxItems);
    };

    return factory;
}

})();