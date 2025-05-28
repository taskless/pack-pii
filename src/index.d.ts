// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference lib="es2021" />

declare module "main" {
  export function pre(): I32;
  export function post(): I32;
}

declare module "extism:host" {
  // no host functions to load
}
