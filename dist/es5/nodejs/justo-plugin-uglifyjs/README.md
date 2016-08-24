[![NPM version](http://img.shields.io/npm/v/justo-plugin-uglifyjs.svg)](https://www.npmjs.org/package/justo-plugin-uglifyjs)
[![Build Status](https://travis-ci.org/justojsp/justo-plugin-uglifyjs.svg?branch=master)](https://travis-ci.org/justojsp/justo-plugin-uglifyjs)
[![Dependency Status](https://david-dm.org/justojsp/justo-plugin-uglifyjs.svg)](https://david-dm.org/justojsp/justo-plugin-uglifyjs)
[![devDependency Status](https://david-dm.org/justojsp/justo-plugin-uglifyjs/dev-status.svg)](https://david-dm.org/justojsp/justo-plugin-uglifyjs#info=devDependencies)

Plugin for **UglifyJS**.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
justo install justo-plugin-uglifyjs
```

## Use

```
const uglifyjs = require("justo-plugin-uglifyjs");
```

To run `uglifyjs`, the task must be called as follows:

```
uglifyjs(jsOpts, opts)
```

The `opts` parameter:

- `src` (string or string[]). The files to minify.
- `dst` (string). The output file.
- `preamble` (string). Preamble to prepend to the output.
- `output` (boolean). Show the output? `true` or `false`. Default: `true`.

Example:

```
uglifyjs("Minify React bundle", {
  src: "react-app.js",
  dst: "react-app.min.js"
});
```
