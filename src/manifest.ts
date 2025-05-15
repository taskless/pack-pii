import { type Manifest } from "./__generated__/manifest.js";

export const manifest = {
  schema: "pre2",
  name: "testpack",
  version: "0.0.1",
  description: "Test pack, never published to prod",
  permissions: {
    // no extended permissions required
  },
  fields: [],
  charts: [],
} satisfies Manifest;
