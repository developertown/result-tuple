import { ResultTuple } from "../ResultTuple";
import { ResultStatus } from "../ResultStatus";
import { isError, isSuccess } from "../TypeGuards";

describe("TypeGuards", () => {
  describe("isSuccess", () => {
    it("recognizes successful result tuples without a payload", () => {
      const result: ResultTuple = [ResultStatus.Ok];
      expect(isSuccess(result)).toBeTruthy();
    });

    it("recognizes successful result tuples with a payload", () => {
      const result: ResultTuple<string> = [ResultStatus.Ok, "hello, world"];
      expect(isSuccess(result)).toBeTruthy();
    });

    it("recognizes error result tuples without a payload", () => {
      const result: ResultTuple = [ResultStatus.Error, new Error("fail")];
      expect(isSuccess(result)).toBeFalsy();
    });

    it("recognizes error result tuples that are defined to have a payload", () => {
      const result: ResultTuple<string> = [ResultStatus.Error, new Error("fail")];
      expect(isSuccess(result)).toBeFalsy();
    });
  });
  describe("isError", () => {
    it("recognizes error result tuples", () => {
      const result: ResultTuple = [ResultStatus.Error, new Error()];
      expect(isError(result)).toBeTruthy();
    });

    it("recognizes error result tuples with a custom error type", () => {
      const result: ResultTuple<string, number> = [ResultStatus.Error, 24];
      expect(isError(result)).toBeTruthy();
    });
  });
});
