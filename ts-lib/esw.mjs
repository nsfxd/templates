import {spawn} from "node:child_process"
import esbuild from "esbuild"
import glob from "glob"

const DIR = "temp"
let SERVER
function onEnd() {
  if (SERVER) SERVER.kill("SIGINT")
  SERVER = spawn("node", ["--test", DIR], {stdio: "inherit"})
}

const plugins = [
  {
    name: "onEnd",
    setup(b) {
      b.onEnd(onEnd)
    },
  },
]

const entryPoints = await glob("test/**/*.test.ts")
const ctx = await esbuild.context({
  entryPoints,
  bundle: true,
  outdir: DIR,
  platform: "node",
  packages: "external",
  plugins,
})

await ctx.watch()
