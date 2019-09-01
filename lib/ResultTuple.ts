import { Invariant } from "./Invariant";
import { StatusOk, StatusErr } from "./ResultStatus";

const BAD_RESULT_TUPLE = Symbol();

export type ResultTuple<P = void, E = Error, T = StatusOk | StatusErr> = P extends void
  ? T extends StatusOk
    ? [StatusOk]
    : T extends StatusErr
    ? [StatusErr, E]
    : Invariant<[typeof BAD_RESULT_TUPLE]>
  : T extends StatusOk
  ? [StatusOk, P]
  : T extends StatusErr
  ? [StatusErr, E]
  : Invariant<[typeof BAD_RESULT_TUPLE]>;
