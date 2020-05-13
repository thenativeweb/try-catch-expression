# try-catch-expression

a try-catch-finally construct in an inlinable expression.

## Status

| Category         | Status                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/try-catch-expression)](https://www.npmjs.com/package/try-catch-expression)                 |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/try-catch-expression)                                          |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/try-catch-expression)                                      |
| Build            | ![GitHub Actions](https://github.com/thenativeweb/try-catch-expression/workflows/Release/badge.svg?branch=master) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/try-catch-expression)                                |

## Installation

```shell
$ npm install try-catch-expression
```

## Quick start

First you need to add a reference to try-catch-expression in your application:

```javascript
const { tryCatch, tryFinally, tryCatchFinally } = require('try-catch-expression');
```

If you use TypeScript, use the following code instead:

```typescript
import { tryCatch, tryFinally, tryCatchFinally } from 'try-catch-expression';
```

To use a simple try/catch, use `tryCatch` and pass a potentially failing
function as well as an error handler:

```javascript
const result = tryCatch(
  () => potentiallyFailingOperation(),
  ex => {
    if (ex.code === 'EKNOWNERROR') {
      return 'default-value';
    }

    throw ex;
  }
);
```

The variable `result` will then either contain the return value of the try
function, in case it succeeds, or alternatively the default value returned from
the catch function. Any error thrown in the catch function will be passed
through to the enclosing scope.

There are also `tryCatchFinally` and `tryFinally` available:

```javascript
const result = tryCatchFinally(
  () => readFromFileHandle(),
  error => return 'default-value',
  () => closeFileHandle()
);

const result = tryFinally(
  () => potentiallyFailingOperation(),
  () => necessaryCleanUp()
);
```

Note that the return value of the finally function will be discarded, to avoid
[confusing behavior](https://eslint.org/docs/rules/no-unsafe-finally).

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```
