import { type Manifest } from "./__generated__/manifest.js";

export type ValidConfigurationValue = NonNullable<
  Manifest["fields"]
>[number]["default"];

export type GetConfiguration = (
  name: string
) => ValidConfigurationValue | undefined;
