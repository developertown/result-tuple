const INVARIANT_MARKER = Symbol();
type Invariant<T> = {
  [INVARIANT_MARKER](t: T): T;
};
