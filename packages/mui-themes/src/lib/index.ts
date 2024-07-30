export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export type KeysWithSpecificType<T, Type> = {
  [K in keyof T]: T[K] extends Type ? K : never;
}[keyof T];
