//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const task = require("../../dist/es5/nodejs/justo-plugin-uglifyjs");

//suite
suite("API", function() {
  test("task", function() {
    task.must.be.instanceOf(Function);
  });
})();
