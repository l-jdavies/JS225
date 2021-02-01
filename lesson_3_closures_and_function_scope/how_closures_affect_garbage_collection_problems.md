1. In the following code, when can JavaScript garbage collect the values assigned to the variables a, b, and c?
```JavaScript
let a = 'abc';

function add(b) {
  a += b;
}

function run() {
  let c = add('xyz');
}

run();
```

`abc` can be garbage collected once the `run` function reassigns `a` to the string `abcxyz`. Once the `add` function finishes, `xyz` assigned to `b` can be GC. When `run` finishes, the value of `c` can be GC. Once the program has finished, `abcxyz` assigned to `a` is eligible for GC.

2. In the following code, when can JavaScript garbage collect the value "Steve"?
```JavaScript
function makeHello(name) {
  return function() {
    console.log("Hello, " + name + "!");
  };
}

let helloSteve = makeHello("Steve");
```
Only when the program finishes and the function referenced by `helloSteve` has been garbage collected.

