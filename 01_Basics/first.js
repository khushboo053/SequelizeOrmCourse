function sayHello() {
  console.log("Welcome!");
  console.log(global);
  global.console.log("Global object");
  globalThis.setTimeout(function () {
    console.log("Message will run after 2 seconds");
  }, 2000);
}

// sayHello();

const second = require("./second");

var message = "This is a message";
// console.log(module);
console.log(message);
console.log(second.message);
console.log(second.other_variable);
console.log(second);
