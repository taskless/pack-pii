import { type Manifest } from "@taskless/loader";

export type ValidConfigurationValue = NonNullable<
  Manifest["fields"]
>[number]["default"];

export type GetConfiguration = (
  name: string
) => ValidConfigurationValue | undefined;
