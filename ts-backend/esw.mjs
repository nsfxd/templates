import {spawn} from "node:child_process"
import esbuild from "esbuild"

let SERVER
function onEnd() {
  if (SERVER) SERVER.kill("SIGINT")
  SERVER = spawn("node", ["temp/app.js"], {stdio: "inherit"})
}

const ctx = await esbuild.context({
  entryPoints: [process.argv[2]],
  bundle: true,
  outdir: "temp",
  platform: "node",
  plugins: [
    {
      name: "onEnd",
      setup(b) {
        b.onEnd(onEnd)
      },
    },
  ],
})

await ctx.watch()
