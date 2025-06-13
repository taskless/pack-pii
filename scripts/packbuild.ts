import { writeFileSync } from "node:fs";
import path from "node:path";
import { manifest } from "../src/manifest.js";
import { fixture } from "../test/fixture.js";

const __dirname = new URL(".", import.meta.url).pathname;

// write the manifest
writeFileSync(
  path.resolve(__dirname, "../dist/manifest.json"),
  JSON.stringify(manifest, null, 2)
);

// write a new test fixture
writeFileSync(
  path.resolve(__dirname, "../test/fixture.json"),
  JSON.stringify(fixture, null, 2)
);
