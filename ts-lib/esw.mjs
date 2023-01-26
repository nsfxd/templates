import {spawn} from 'node:child_process'
import esbuild from 'esbuild'

const filename = process.argv[2].split('/').at(-1).split('.').at(0)
let SERVER
function onEnd() {
  if (SERVER) SERVER.kill('SIGINT')
  SERVER = spawn('node', [`temp/${filename}.js`], {stdio: 'inherit'})
}

const ctx = await esbuild.context({
  entryPoints: [process.argv[2]],
  bundle: true,
  outdir: 'temp',
  platform: 'node',
  plugins: [
    {
      name: 'onEnd',
      setup(b) {
        b.onEnd(onEnd)
      },
    },
  ],
})

await ctx.watch()
