const message = "Updated message";
const other = "Other Message";

sayHello = () => {
  console.log("This hello is from second.js file");
};

// module.exports.message = message;
// module.exports.other_variable = other;
// module.exports.sayHello = sayHello;
// console.log(module);

module.exports = {
  message: message,
  other_variable: other,
  sayHello: sayHello,
};
