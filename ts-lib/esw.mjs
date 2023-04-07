import {spawn} from "node:child_process"
import esbuild from "esbuild"
import glob from "glob"

const IS_TEST = process.argv[2] === "test"
const DIR = IS_TEST ? "temp" : "dist"

let SERVER
function onEnd() {
  if (SERVER) SERVER.kill("SIGINT")
  SERVER = spawn("node", ["--test", DIR], {stdio: "inherit"})
}

const plugins = IS_TEST
  ? [
      {
        name: "onEnd",
        setup(b) {
          b.onEnd(onEnd)
        },
      },
    ]
  : []

const entryPoints = IS_TEST ? await glob("test/**/*.test.ts") : ["src/index.ts"]

const ctx = await esbuild.context({
  entryPoints,
  sourcemap: !IS_TEST,
  minify: !IS_TEST,
  bundle: true,
  outdir: DIR,
  platform: "node",
  packages: "external",
  plugins,
})

IS_TEST && (await ctx.watch())
