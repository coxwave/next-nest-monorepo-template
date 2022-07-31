export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
export type Fn<T> = () => T;
export type Nullable<T> = T | null;
export type MaybePromise<T> = T | Promise<T>;
export type Optional<T> = T | undefined;
export type Params = Record<string, any>;
