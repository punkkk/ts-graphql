export type Lazy<T extends Record<string, unknown>> = Promise<T> | T;
