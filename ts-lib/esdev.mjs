import {spawn} from "node:child_process"
import esbuild from "esbuild"
import {readdirSync} from "node:fs"

const TEMP_DIR = "temp"
const TEST_DIR = "test"

let SERVER
function onEnd() {
  if (SERVER) SERVER.kill("SIGINT")
  SERVER = spawn("node", ["--test", TEMP_DIR], {stdio: "inherit"})
}

const plugins = [
  {
    name: "onEnd",
    setup(b) {
      b.onEnd(onEnd)
    },
  },
]

const entryPoints = readdirSync(TEST_DIR).map((v) => `${TEST_DIR}/${v}`)

const ctx = await esbuild.context({
  entryPoints,
  bundle: true,
  outdir: TEMP_DIR,
  platform: "node",
  packages: "external",
  plugins,
})

await ctx.watch()
