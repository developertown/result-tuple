export enum ResultStatus {
  Ok,
  Error,
}

export type StatusOk = ResultStatus.Ok;
export const StatusOk = ResultStatus.Ok;
export type StatusErr = ResultStatus.Error;
export const StatusErr = ResultStatus.Error;
