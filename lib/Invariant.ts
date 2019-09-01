const INVARIANT_MARKER = Symbol();
export type Invariant<T> = {
  [INVARIANT_MARKER](t: T): T;
};
