# result-tuple

[![Build Status](https://travis-ci.org/developertown/result-tuple.svg?branch=master)](https://travis-ci.org/developertown/result-tuple)
[![Coverage Status](https://coveralls.io/repos/github/developertown/result-tuple/badge.svg?branch=master)](https://coveralls.io/github/developertown/result-tuple?branch=master)

[![Dependency Status](https://david-dm.org/developertown/result-tuple.svg)](https://david-dm.org/developertown/result-tuple)
[![Dev Dependency Status](https://david-dm.org/developertown/result-tuple/dev-status.svg)](https://david-dm.org/developertown/result-tuple)

result-tuple is a small set of types for Typescript that make it easier to handle success and error return conditions from your functions in a type-safe manner.  This is partly inspired by
the pattern matching possible in a range of functional languages (for example, [Pattern Matching in F#](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/pattern-matching)).

## Installation

```bash
yarn add -D @developertown/result-tuple
```

## Usage

Using `ResultTuple`, you can define a contract with code calling your function that
helps ensure better handling of both success and failure conditions.  It also helps
avoid mistakes in situations where a function returns a number or string, and truthy/falsey
checks have surprising outcomes.

```typescript
import { ResultTuple, StatusErr, StatusOk, isSuccess, isError } from "@developertown/result-tuple";

const successNoPayload = (): ResultTuple => {
  return [StatusOk];
};

const successWithPayload = (): ResultTuple<string> => {
  return [StatusOk, "Hello world!"];
};

const functionReturningAnError = (): ResultTuple => {
  return [StatusErr, new Error("oh no!")];
};


// ResultStatus type guards:
{
  const result = successNoPayload();
  if (isSuccess(result)) {
    console.log("Success!");
  } else {
    const [, err] = result;
    // note the automatic typing here - if it was not success
    // it must be failure, and the compiler can determine that
    // the destructured second element of the tuple must be an Error object
    console.log("Oh no, the error message was", err.message);
  }
}

// "Fire and forget" calling patterns
// When a function returns a value, but the caller doesn't need the value
// but does need to check success
{
  const [status] = successWithPayload();
  if (status === StatusOk) {
    console.log("It worked!");
  }
}

// Handling errors
{
  const result = functionReturningAnError();
  if (isError(result)) {
    const [, err] = result;
    // log it and toss it up to the next level
    console.log("Oh no, we got an error:", err.message);
    throw err;
  }
}
```

## API

### `ResultTuple<P, E, T>`

ResultTuple accepts up to 3 (optional) type arguments:

* **`P`**: **P**ayload Type.  If your function returns a result value beyond just
  `StatusOk` or `StatusErr`, define it here.  For example, `ResultTuple<number>` will
  define a return type (for happy path) of `[StatusOk, number]`.
* **`E`**: **E**rror Type.  This defaults to the standard `Error` type, but you can override
  this with other types if you wish. By default, `ResultStatus<number>` might return `[StatusErr, Error]`, but you could override with `ResultStatus<number, string>` to return a simple
  message instead.
* **`T`**: Status **T**ype.  While not recommended to override, this defaults to the standard
  values of `StatusOk | StatusErr`.

### `StatusOk`

This is defined as both a type alias and a `const` literal value pointing to the enum value `ResultStatus.Ok`.

### `StatusErr`

This is defined as both a type alias and a `const` literal value pointing to the enum value `ResultStatus.Err`.

### `isSuccess(result: ResultTuple<any, any, any>)`
This is a type guard function that will evaluate whether or not a particular result indicates
success.  This is useful to let TS automatically type the result value based on the outcome
of this call in a conditional.

### `isError(result: ResultTuple<any, any, any>)`
This is a type guard function that will evaluate whether or not a particular result indicates
an error.  This is useful to let TS automatically type the result value based on the outcome
of this call in a conditional.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
