//imports
import path from "path";
import os from "os";
import child_process from "child_process";

/**
 * Runs uglifyjs CLI.
 */
export default function op(params, console) {
  var cmd, args = [], opts = {}, res;

  //(1) arguments
  if (params.length >= 1) opts = Object.assign({}, params[0]);
  if (typeof(opts.src) == "string") opts.src = [opts.src];
  if (!opts.src || opts.src.length == 0) throw new Error("src expected.");
  if (!opts.dst) throw new Error("dst expected.");
  if (!opts.hasOwnProperty("output")) opts.output = true;

  //(2) get command
  if (/^win/.test(os.platform())) cmd = path.join(process.cwd(), "/node_modules/.bin/uglifyjs.cmd");
  else cmd = path.join(process.cwd(), "/node_modules/.bin/uglifyjs");

  //(3) get command arguments
  for (let file of opts.src) args.push(file);
  args.push("--output");
  args.push(opts.dst);
  if (opts.preamble) args.push("--preamble"), args.push(opts.preamble);

  //(4) run
  res = child_process.spawnSync(cmd, args);
  if (res.status != 0 && opts.output) console.log(res.stderr.toString());
  if (res.status != 0) throw new Error(res.stderr.toString());

  //(5) return result
  return res.status;
}
