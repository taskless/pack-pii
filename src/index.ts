import {
  asArray,
  checkBody,
  checkHeaders,
  createConfiguration,
  normalizeBody,
  readInput,
  writeOutput,
} from "./helpers.js";
import { checks, manifest } from "./manifest.js";

/**
 * pre() is called before the request is sent to the host
 */
export async function pre() {
  const input = readInput();
  const getConfig = createConfiguration(input.configuration, manifest);
  const body = input.request.body
    ? normalizeBody(input.request.body)
    : undefined;

  const captures: Array<Record<string, unknown>> = [];
  const regexes: RegExp[] = [];

  for (const check of checks) {
    const fieldRegexes = asArray(getConfig(check.field.name))
      .filter((v) => typeof v === "string")
      .map((v) => new RegExp(v, "i"));
    const valueRegexes = asArray(getConfig(check.value.name))
      .filter((v) => typeof v === "string")
      .map((v) => new RegExp(v, "i"));

    regexes.push(...fieldRegexes, ...valueRegexes);

    captures.push(
      checkHeaders(
        `${check.prefix}.send`,
        input.request.headers,
        fieldRegexes,
        valueRegexes
      )
    );

    if (body) {
      captures.push(
        checkBody(`${check.prefix}.send`, body, fieldRegexes, valueRegexes)
      );
    }
  }

  writeOutput({
    capture: {
      ...(Object.assign({}, ...captures) as Record<string, string | number>),
    },
  });
}

/**
 * post() is called after the request is sent to the host
 * and contains the response body
 */
export async function post() {
  const input = readInput();
  const getConfig = createConfiguration(input.configuration, manifest);
  const body = input.response?.body
    ? normalizeBody(input.response.body)
    : undefined;

  const captures: Array<Record<string, unknown>> = [];

  for (const check of checks) {
    const fieldRegexes = asArray(getConfig(check.field.name))
      .filter((v) => typeof v === "string")
      .map((v) => new RegExp(v, "i"));
    const valueRegexes = asArray(getConfig(check.value.name))
      .filter((v) => typeof v === "string")
      .map((v) => new RegExp(v, "i"));

    captures.push(
      checkHeaders(
        `${check.prefix}.receive`,
        input.response?.headers,
        fieldRegexes,
        valueRegexes
      )
    );

    if (body) {
      captures.push(
        checkBody(`${check.prefix}.receive`, body, fieldRegexes, valueRegexes)
      );
    }
  }

  writeOutput({
    capture: Object.assign({}, ...captures) as Record<string, string | number>,
  });
}
