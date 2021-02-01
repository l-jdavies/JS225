1. Reimplement makeList, so that it returns an Object that provides the interface shown above, including add, list, and remove methods.

```JavaScript
function makeList() {
  return {
  items: [],
    add(item) {
      this.items.push(item);
      console.log(`${item} added!`);
    },
    list() {
      if (items.length > 0) {
        this.items.forEach(listItem => console.log(listItem));
        } else {
        console.log('List is empty!')
        }
    },
    remove(item) {
      this.items = this.items.filter(listItem => listItem !== item);
      console.log(`${item} removed!`)
    }
  }
}

let list = makeList();
list.add('peas');
list.list();
list.add('corn');
list.list();
list.remove('peas');
list.list();
```

2. Update the implementation from problem 1 so that it retains the use of an object with methods but prevents outside access to the items the object stores internally.
```JavaScript
function makeList() {
  let items = [];
  return {
    add(item) {
      items.push(item);
      console.log(`${item} added!`);
    },
    list() {
      if (items.length > 0) {
        items.forEach(listItem => console.log(listItem));
        } else {
        console.log('List is empty!')
        }
    },
    remove(item) {
      items = items.filter(listItem => listItem !== item);
      console.log(`${item} removed!`)
    }
  }
}

let list = makeList();
list.add('peas');
list.list();
list.add('corn');
list.list();
list.remove('peas');
list.list();
```
