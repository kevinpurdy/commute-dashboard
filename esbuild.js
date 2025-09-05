import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["api/index.ts"],
    outfile: "dist/api.js",
    bundle: true,
    platform: "node",
    target: "node20",
    format: "cjs",
    sourcemap: true,
    packages: "external",
  })
  .catch(() => process.exit(1));
