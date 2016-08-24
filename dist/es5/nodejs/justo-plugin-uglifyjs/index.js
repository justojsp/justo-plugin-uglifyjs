"use strict";
var _justo = require("justo");


var NS = "org.justojs.plugin";


module.exports = (0, _justo.simple)({ ns: NS, name: "uglifyjs" }, require("./lib/op").default);