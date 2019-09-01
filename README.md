# result-tuple

[![Build Status](https://travis-ci.org/developertown/result-tuple.svg?branch=master)](https://travis-ci.org/developertown/result-tuple)
[![Coverage Status](https://coveralls.io/repos/github/developertown/result-tuple/badge.svg?branch=master)](https://coveralls.io/github/developertown/result-tuple?branch=master)

[![Dependency Status](https://david-dm.org/developertown/result-tuple.svg)](https://david-dm.org/developertown/result-tuple)
[![Dev Dependency Status](https://david-dm.org/developertown/result-tuple/dev-status.svg)](https://david-dm.org/developertown/result-tuple)

result-tuple is a small set of types for Typescript that make it easier to handle success and error return conditions from your functions in a type-safe manner.

## Installation

```bash
yarn add -d @developertown/result-tuple
```

## Usage

```typescript
import { ResultTuple, StatusErr, StatusOk } from "@developertown/result-tuple";

const successNoPayload = (): ResultTuple => {
  return [StatusOk];
};

const successWithPayload = (): ResultTuple<string> => {
  return [StatusOk, "Hello world!"];
};

const functionReturningAnError = (): ResultTuple => {
  return [StatusErr, new Error("oh no!")];
};
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
