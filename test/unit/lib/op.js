//imports
const path = require("path");
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const op = require("../../../dist/es5/nodejs/justo-plugin-uglifyjs/lib/op").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data";
  var DST_DIR, DST;

  init("*", function() {
    DST_DIR = Dir.createTmpDir();
    DST = DST_DIR.path;
  }).title("create tmp dir");

  fin("*", function() {
    DST_DIR.remove();
  }).title("Remove tmp dir");

  suite("Error handling", function() {
    test("op(opts) - no src", function() {
      op.must.raise("src expected.", [[{}], console]);
    });

    test("op(opts) - no dst", function() {
      op.must.raise("dst expected.", [[{src: path.join(DATA, "file.js")}], console]);
    });
  });

  test("op({src: string, dst})", function(console) {
    op([{
      src: path.join(DATA, "file.js"),
      dst: path.join(DST, "file.min.js")
    }], console);

    file(DST, "file.min.js").must.exist();
    file(DST, "file.min.js").must.contain("buongiorno");
    file(DST, "file.min.js").must.not.contain(["  ", "//comment"]);
  });

  test("op({src: string[], dst})", function(console) {
    op([{
      src: [path.join(DATA, "file.js"), path.join(DATA, "file2.js")],
      dst: path.join(DST, "file.min.js")
    }], console);

    file(DST, "file.min.js").must.exist();
    file(DST, "file.min.js").must.contain(["buongiorno", "buonasera"]);
    file(DST, "file.min.js").must.not.contain(["  ", "//comment"]);
  });

  test("op(opts) - preamble", function(console) {
    op([{
      src: path.join(DATA, "file.js"),
      dst: path.join(DST, "file.min.js"),
      preamble: "//this is the preamble"
    }], console);

    file(DST, "file.min.js").must.exist();
    file(DST, "file.min.js").must.contain(["buongiorno", "//this is the preamble"]);
    file(DST, "file.min.js").must.not.contain(["  ", "//comment"]);
  });
})();
