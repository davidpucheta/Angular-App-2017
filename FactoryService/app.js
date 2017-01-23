(function() {
'use strict';

angular.module('ShoppingListApp', [])
    .controller('ShoppingListController1', ShoppingListController1)
    .controller('ShoppingListController2', ShoppingListController2)
    .factory('ShoppingListFactory', ShoppingListFactory);

//List 1 controller
ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1 (ShoppingListFactory) {
    var list1 = this;

  //use factory to create ShoppingList srvice
  var ShoppingList = ShoppingListFactory();

  list1.items = ShoppingList.getItems();

  list1.itemName = "";
  list1.itemQuantity = "";

  list1.addItem = function(){
      ShoppingList.addItem(list1.itemName, list1.itemQuantity);
  };

  list1.removeItem = function(itemIndex){
      ShoppingList.removeItem(itemIndex);
  };
}

ShoppingListController2.$inject = ['ShoppingListFactory']
function ShoppingListController2(ShoppingListFactory) {
     var list2 = this;

    //use factory to create ShoppingList srvice
    var ShoppingList = ShoppingListFactory(3);

    list2.items = ShoppingList.getItems();

    list2.itemName = "";
    list2.itemQuantity = "";

    list2.addItem = function(){
        try{
             ShoppingList.addItem(list2.itemName, list2.itemQuantity);
        } catch (error) {
            list2.errorMessage = error.message;
        }
    };

    list2.removeItem = function(itemIndex){
        ShoppingList.removeItem(itemIndex);
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