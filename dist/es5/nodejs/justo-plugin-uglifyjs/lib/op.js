"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default =







op;var _path = require("path");var _path2 = _interopRequireDefault(_path);var _os = require("os");var _os2 = _interopRequireDefault(_os);var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params, console) {
  var cmd,args = [],opts = {},res;


  if (params.length >= 1) opts = Object.assign({}, params[0]);
  if (typeof opts.src == "string") opts.src = [opts.src];
  if (!opts.src || opts.src.length == 0) throw new Error("src expected.");
  if (!opts.dst) throw new Error("dst expected.");
  if (!opts.hasOwnProperty("output")) opts.output = true;


  if (/^win/.test(_os2.default.platform())) cmd = _path2.default.join(process.cwd(), "/node_modules/.bin/uglifyjs.cmd");else
  cmd = _path2.default.join(process.cwd(), "/node_modules/.bin/uglifyjs");var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {


    for (var _iterator = opts.src[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var file = _step.value;args.push(file);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
  args.push("--output");
  args.push(opts.dst);
  if (opts.preamble) args.push("--preamble"), args.push(opts.preamble);


  res = _child_process2.default.spawnSync(cmd, args);
  if (res.status != 0 && opts.output) console.log(res.stderr.toString());
  if (res.status != 0) throw new Error(res.stderr.toString());


  return res.status;
}