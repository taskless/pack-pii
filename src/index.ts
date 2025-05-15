import { type PluginOutput as PO } from "@taskless/loader";
import { type Pack } from "./__generated__/pack.js";
import { writeOutput } from "./helpers.js";

type PluginOutput<TContext = unknown> = PO<TContext> &
  Pick<Pack, "configuration">;

type Context = {
  start: number;
};

type AnyResponse =
  | undefined
  | string
  | {
      error?: string;
      message?: string;
      err?: {
        type?: string;
      };
    };

export function pre() {
  writeOutput<PluginOutput<Context>>({
    capture: {
      testPre: "preTest",
    },
  });
}

export function post() {
  writeOutput<PluginOutput<Context>>({
    capture: {
      testPost: "postTest",
    },
  });
}
