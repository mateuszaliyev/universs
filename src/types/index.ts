export type NonReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};
