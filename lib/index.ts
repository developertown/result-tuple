export enum ResultStatus {
  Ok,
  Error,
}

export type StatusOk = ResultStatus.Ok;
export const StatusOk = ResultStatus.Ok;
export type StatusErr = ResultStatus.Error;
export const StatusErr = ResultStatus.Error;

const INVARIANT_MARKER = Symbol();
type Invariant<T> = {
  [INVARIANT_MARKER](t: T): T;
};

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

// These are utility type guard functions that lets us easily check if result tuples were successful
const isSuccess = (status: ResultTuple<any, any, StatusOk | StatusErr>): status is ResultTuple<any, any, StatusOk> =>
  status[0] === StatusOk;

const isError = (status: ResultTuple<any, any, StatusOk | StatusErr>): status is ResultTuple<any, any, StatusErr> =>
  status[0] === StatusErr;
