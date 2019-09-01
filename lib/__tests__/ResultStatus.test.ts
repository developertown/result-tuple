import { StatusOk, ResultStatus, StatusErr } from "../ResultStatus";

describe("ResultStatus types", () => {
  describe("type aliases", () => {
    test("StatusOk is the same as ResultStatus.Ok", () => {
      expect(StatusOk).toBe(ResultStatus.Ok);
    });
    test("StatusErr is the same as ResultStatus.Error", () => {
      expect(StatusErr).toBe(ResultStatus.Error);
    });
  });

  describe("const literals", () => {
    test("StatusOk is equal to the value of ResultStatus.Ok", () => {
      expect(StatusOk).toEqual(ResultStatus.Ok);
    });
    test("StatusErr is equal to the value of ResultStatus.Error", () => {
      expect(StatusErr).toEqual(ResultStatus.Error);
    });
  });
});
