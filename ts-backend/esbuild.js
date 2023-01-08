let server,
  isDev = process.argv[2] === "dev",
  {spawn} = require("child_process"),
  onRebuild = () => {
    if (isDev) {
      if (server) server.kill("SIGINT");
      server = spawn("node", ["dist/app.js"], {stdio: "inherit"});
    }
  };

require("esbuild")
  .build({
    entryPoints: ["src/app.ts"],
    outdir: "dist",
    platform: "node",
    bundle: true,
    sourcemap: isDev || true,
    watch: isDev && {onRebuild},
  })
  .finally(onRebuild);
