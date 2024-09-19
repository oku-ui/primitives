export type ConvertEmitsToUseEmits<T extends Record<string, any[]>> = {
  [K in keyof T as K extends `update:${infer Rest}`
    ? `onUpdate${Capitalize<Rest>}`
    : `on${Capitalize<string & K>}`]?: (event: T[K][0]) => void
}
