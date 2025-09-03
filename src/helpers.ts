import {
  type PluginOutput,
  type PluginInput,
  type Pack,
  type Manifest,
} from "@taskless/loader";
import {
  type GetConfiguration,
  type ValidConfigurationValue,
} from "./types.js";

type PackConfiguration = Pick<Pack, "configuration">["configuration"];

export const readInput = <
  TContext extends Record<string, unknown> = Record<string, unknown>,
  TRequestBody = unknown,
  TResponseBody = unknown,
>() => {
  return JSON.parse(Host.inputString()) as PluginInput<
    TContext,
    TRequestBody,
    TResponseBody
  > & {
    configuration?: PackConfiguration;
  };
};

export const createConfiguration = (
  config: PackConfiguration,
  manifest: Manifest
) => {
  const get: GetConfiguration = (name: string) => {
    // check for name in the configuration
    if (config && name in config) {
      return config[name] as ValidConfigurationValue;
    }

    // check for name in the manifest fields
    const field = (manifest.fields ?? []).find((f) => f.name === name);
    if (field) {
      return field.default;
    }

    return undefined;
  };

  return get;
};

export const asArray = <T>(value: T | T[]): T[] => {
  if (Array.isArray(value)) {
    return value;
  }

  return [value];
};

export const writeOutput = <
  TContext extends Record<string, unknown> = Record<string, unknown>,
>(
  data: PluginOutput<TContext>
) => {
  Host.outputString(JSON.stringify(data));
};

export const isValidHost = (hostName: string, domains: string[]): boolean => {
  // domains contain a * as a simple wildcard for any number of characters
  // ie: *.stripe.com
  return domains.some((domain) => {
    const regex = new RegExp(
      `^${domain.replaceAll(".", "\\.").replace("*", ".*")}$`
    );
    return regex.test(hostName);
  });
};

export const normalizeBody = <TBody = string>(
  body: unknown,
  parser: (raw: string) => TBody | undefined = (v) => v as TBody
) => {
  if (!body) {
    return undefined;
  }

  if (typeof body === "object" && body !== null) {
    body = JSON.stringify(body);
  }

  return parser(body as string);
};

export const checkHeaders = (
  namespace: string,
  headers: Array<[string, string]> | undefined,
  fieldRegexes: RegExp[],
  valueRegexes: RegExp[]
) => {
  const capture: Record<string, string | number> = {};

  if (!headers) return capture;

  for (const [key, value] of headers) {
    for (const regex of fieldRegexes) {
      if (regex.test(key)) {
        capture[`${namespace}`] = 1;
        capture[`${namespace}.header.field`] = 1;
      }
    }

    for (const regex of valueRegexes) {
      if (regex.test(value)) {
        capture[`${namespace}`] = 1;
        capture[`${namespace}.header.value`] = 1;
      }
    }
  }

  return capture;
};

export const checkBody = (
  namespace: string,
  body: string | undefined,
  fieldRegexes: RegExp[],
  valueRegexes: RegExp[]
) => {
  const capture: Record<string, string | number> = {};

  if (!body) return capture;

  for (const regex of fieldRegexes) {
    const matches = body.match(regex);
    if (matches) {
      capture[`${namespace}`] = 1;
      capture[`${namespace}.body.field`] = 1;
      break; // stop at first match
    }
  }

  for (const regex of valueRegexes) {
    const matches = body.match(regex);
    if (matches) {
      capture[`${namespace}`] = 1;
      capture[`${namespace}.body.text`] = 1;
      break; // stop at first match
    }
  }

  return capture;
};
