//imports
const justo = require("justo");
const catalog = justo.catalog;
const babel = require("justo-plugin-babel");
const clean = require("justo-plugin-fs").clean;
const copy = require("justo-plugin-fs").copy;
const lint = require("justo-plugin-eslint");
const publish = require("justo-plugin-npm").publish;

//catalog
catalog.workflow({name: "build", desc: "Build the package."}, function() {
  clean("Clean build directory", {
    dirs: ["build/es5"]
  });

  lint("Best practices and grammar", {
    output: true,
    src: [
      "index.js",
      "Justo.js",
      "lib/op.js",
      "test/unit/index.js",
      "test/unit/lib/"
    ]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    preset: "es2015",
    files: [
      {src: "index.js", dst: "build/es5/"},
      {src: "lib/", dst: "build/es5/lib"}
    ]
  });

  clean("Clean dist directory", {
    dirs: ["dist/es5"]
  });

  copy(
    "Create package",
    {
      src: "build/es5/index.js",
      dst: "dist/es5/nodejs/justo-plugin-uglifyjs/"
    },
    {
      src: "build/es5/lib/",
      dst: "dist/es5/nodejs/justo-plugin-uglifyjs/lib"
    },
    {
      src: ["package.json", "README.md"],
      dst: "dist/es5/nodejs/justo-plugin-uglifyjs/"
    }
  );
});

catalog.macro({name: "test", desc: "Unit test."}, {
  require: "justo-assert",
  src: [
    "test/unit/index.js",
    "test/unit/lib/"
  ]
});

catalog.workflow({name: "publish", desc: "NPM publish."}, function() {
  publish("Publish in NPM", {
    who: "justojs",
    src: "dist/es5/nodejs/justo-plugin-uglifyjs/"
  });
});

catalog.macro({name: "default", desc: "Default task."}, ["build", "test"]);
