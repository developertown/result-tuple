import * as path from "path";
import * as tsnode from "ts-node";

const testCompile = (compiler: tsnode.Register, snippet: string): void => {
  const code = `
import {ResultTuple, StatusOk, StatusErr} from ".";
${snippet}
`;
  compiler.compile(code, "[eval].ts");
};

/**
 * Note, these serve as compilation proofs more than anything else
 */
describe("ResultTuple", () => {
  let compiler: tsnode.Register;
  beforeAll(() => {
    compiler = tsnode.register({
      ...tsnode.DEFAULTS,
      compilerOptions: {
        ...tsnode.DEFAULTS.compilerOptions,
        noEmit: true,
      },
      typeCheck: true,
    });
    compiler.cwd = path.resolve(__dirname, "..");
    // compiler.extensions.
  });

  describe("with StatusOk result", () => {
    it("can be defined with no payload", () => {
      expect(() => testCompile(compiler, `const x = (): ResultTuple => [StatusOk]`)).not.toThrow();
    });

    it("can be defined with a payload", () => {
      expect(() => testCompile(compiler, `const x = (): ResultTuple<string> => [StatusOk, "hello"]`)).not.toThrow();
    });

    it("fails when defined with no payload, but a payload is returned", () => {
      expect(() => testCompile(compiler, `const x = (): ResultTuple => [StatusOk, "hello"]`)).toThrow();
    });

    it("fails when defined with a payload, but no payload returned", () => {
      expect(() => testCompile(compiler, `const x = (): ResultTuple<string> => [StatusOk]`)).toThrow();
    });
  });

  describe("with StatusErr result", () => {
    it("succeeds if status is error and an error object is returned", () => {
      expect(() =>
        testCompile(compiler, `const x = (): ResultTuple<string> => [StatusErr, new Error("fail")]`),
      ).not.toThrow();
    });

    it("fails if status is error and no error is returned", () => {
      expect(() => testCompile(compiler, `const x = (): ResultTuple<string> => [StatusErr]`)).toThrow();
    });
  });
});
