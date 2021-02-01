1. Create a makeCounterLogger function that takes a number as an argument and returns a function. When we invoke the returned function with a second number, it should count up or down from the first number to the second number, logging each number to the console:
```JavaScript
> let countlog = makeCounterLogger(5);
> countlog(8);
5
6
7
8
> countlog(2);
5
4
3
2
```

```JavaScript
function makeCounterLogger(startNum) {
  return function(secondNum) {
    let loggedNum;

    if (startNum > secondNum) {
      for (loggedNum = startNum; loggedNum >= secondNum; loggedNum -= 1) {
        console.log(loggedNum);
      }

      } else {
        for (loggedNum = startNum; loggedNum <= secondNum; loggedNum += 1) {
          console.log(loggedNum);
        }
      }
  }
}

let countlog = makeCounterLogger(5);
countlog(8);
countlog(2);
```

2. We'll build a simple todo list program using the techniques we've seen in this assignment. Write a makeList function that returns a new function that implements a todo list. The returned function should have the following behavior:

When called with an argument that is not already on the list, it adds that argument to the list.
When called with an argument that is already on the list, it removes the element from the list.
When called without arguments, it logs all items on the list. If the list is empty, it logs an appropriate message.
```JavaScript
> let list = makeList();
> list();
The list is empty.
> list('make breakfast');
make breakfast added!
> list('read book');
read book added!
> list();
make breakfast
read book
> list('make breakfast');
make breakfast removed!
> list();
read book
```

```JavaScript
function makeList() {
  let itemList = [];

  function printList() {
    if (itemList.length > 0) {
      itemList.forEach(item => console.log(item));
      } else {
      console.log('The list is empty.');
      }
  }

  function addItem(item) {
    itemList.push(item);
    console.log(`${item} added!`)
  }

  function removeItem(item) {
    itemList = itemList.filter(currentItem => currentItem !== item);
    console.log(`${item} removed!`);
  }

  return function(item) {
  if (item === undefined) {
    return printList();
    } else if (!itemList.includes(item)) {
      return addItem(item);
    } else if (itemList.includes(item)) {
      return removeItem(item);
    }
  }
}
```
