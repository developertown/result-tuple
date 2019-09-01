import { StatusOk, StatusErr } from "./ResultStatus";
import { ResultTuple } from "./ResultTuple";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isSuccess = (
  status: ResultTuple<any, any, StatusOk | StatusErr>,
): status is ResultTuple<any, any, StatusOk> => status[0] === StatusOk;

export const isError = (
  status: ResultTuple<any, any, StatusOk | StatusErr>,
): status is ResultTuple<any, any, StatusErr> => status[0] === StatusErr;
/* eslint-enable @typescript-eslint/no-explicit-any */
