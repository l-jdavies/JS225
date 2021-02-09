/* In this exercise, you'll build a simple inventory management system. The system is composed of an item creator, an items manager, and a reports manager. The item creator makes sure that all necessary information are present and valid. The item manager is responsible for creating items, updating information about items, deleting items, and querying information about the items. Finally, the report manager generates reports for a specific item or ALL items. Reports for specific items are generated from report objects created from the report manager. The report manager is responsible for reports for all items.

Component Specifications
Here's all the required information for an item:

SKU code: This is the unique identifier for a product. It consists of the first 3 letters of the item and the first 2 letters of the category. If the item name consists of two words and the first word consists of two letters only, the next letter is taken from the next word.
Item name: This is the name of the item. It must consist of a minimum of 5 characters. Spaces are not counted as characters.
Category: This is the category that the item belongs to. It must consist of a minimum of 5 characters and be only one word.
Quantity: This is the quantity in stock of an item. This must not be blank. You may assume that a valid number will be provided.
The following are the methods that the items manager can perform:

create: This method creates a new item. Returns false if creation is not successful.
update: This method accepts an SKU Code and an object as an argument and updates any of the information on an item. You may assume valid values will be provided.
delete: This method accepts an SKU Code and deletes the item from the list. You may assume a valid SKU code is provided.
items: This property returns all the items.
inStock: This method lists all the items that have a quantity greater than 0.
itemsInCategory: This method lists all the items for a given category
The following are the methods on the reports managers:

init: This method accepts the ItemManager object as an argument and assigns it to the items property.
createReporter: This method accepts an SKU code as an argument and returns an object.
The returned object has one method, itemInfo. It logs to the console all the properties of an object as "key:value" pairs (one pair per line). There are no other properties or methods on the returned object (except for properties/methods inherited from Object.prototype).
reportInStock: Logs to the console the item names of all the items that are in stock as a comma separated values. */

let ItemManager = function () {
  function isValidItem(arr) {
    return (arr.length === 3) && (arr[0].replace(' ', '').length >= 5) && (arr[1].replace(' ', '').length >= 5 && arr[1].split(' ').length === 1) && (arr[2] >= 0);
  }

  function createSkuCode(arr) {
    let sku = '';
    sku += arr[0].slice(0, 3);
    sku += arr[1].slice(0, 2);

    return sku.toUpperCase();
  }

  function transformItemsIntoObj(arr) {
    return {
      name: arr[0],
      category: arr[1],
      quantity: arr[2],
    };
  }

  return {
    items: [],
    create(...item) {
      if (isValidItem(item)) {
        let obj = transformItemsIntoObj(item);
        let sku = createSkuCode(item);
        obj.sku = sku;
        this.items.push(obj);
      } else {
        return false;
      }
    },
    update(sku, obj) {
      this.items.forEach(itemObj => {
        if (itemObj.sku === sku) {
          let keyToBeUpdated = Object.keys(obj)[0];
          itemObj[keyToBeUpdated] = obj[keyToBeUpdated];
        }
      })
    },
    delete(sku) {
      this.items = this.items.filter(itemObj => itemObj.sku !== sku);
    },
    inStock() {
      return this.items.filter(item => item.quantity > 0);
    },
    itemsInCategory(cat) {
      return this.items.filter(item => item.category === cat);
    },
  }
}();

let ReportManager = {
  init(obj) {
    this.items = obj;
  },
  createReporter(sku) {
    let self = this;
    return (function () {
      let selectedItems = self.items.items.filter(itemObj => itemObj.sku === sku);
      return {
        itemInfo() {
          console.log(selectedItems);
        }
      };
    })();
  }
};


ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

ItemManager.items;
// returns list with the 4 valid items

//ReportManager.init(ItemManager);
//ReportManager.reportInStock();
// logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', {quantity: 0});
ItemManager.items()
ItemManager.delete('SOCSP')
ItemManager.items()

/*
ItemManager.inStock();
// returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// logs football,kitchen pot
ItemManager.itemsInCategory('sports');
// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
ItemManager.items;
// returns list with the remaining 3 valid items (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', {quantity: 10});
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10
*/
