1. Create a function that constructs a new object with a log method that is read-only. The log method will use console.log to output the name property on itself.

```JavaScript
function newPerson(name) {
  let obj = {
    name: name,
  };

  Object.defineProperties(obj, {
    log: {
      value: function() {
        console.log(this.name);
      },
      writable: false
    }
  });
  return obj;
};

let me = newPerson('Shane Riley');
me.log();     // => Shane Riley
me.log = function() { console.log('Amanda Rose'); };
me.log();     // => Shane Riley
```
