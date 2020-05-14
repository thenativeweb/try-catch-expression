# try-catch-expression

try-catch-expression provides try..catch as expression.

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

## Rationale

For handling errors, JavaScript and TypeScript provide the `try` / `catch` statement. While it is highly useful, it sometimes makes your code hard to read, e.g. if you want to assign a variable and have a fallback in the `catch` clause:

```javascript
let result;

try {
  result = getValue();
} catch {
  result = getDefaultValue();
}

console.log(result);
```

For this (and other) scenarios it would be helpful it `try` / `catch` was also available as an expression, so that you could write your code in a more convenient way:

```javascript
const result = try {
  return getValue();
} catch {
  return getDefaultValue();
}

console.log(result);
```

Unfortunately, neither JavaScript nor TypeScript support this. That's what this module adds.

## Quick start

First you need to add a reference to try-catch-expression in your application:

```javascript
const { tryCatch, tryFinally, tryCatchFinally } = require('try-catch-expression');
```

If you use TypeScript, use the following code instead:

```typescript
import { tryCatch, tryFinally, tryCatchFinally } from 'try-catch-expression';
```

To use a simple `try` / `catch`, use the `tryCatch` function and pass a potentially failing function as well as a function that acts as a catch clause. In that function, you may return a value that is then also returned by the surrounding `tryCatch` function, or re-throw.

```javascript
const result = tryCatch(
  () => {
    // Try something...
  },
  ex => {
    // Return a default value or re-throw the exception.
  }
);
```

This means that the variable `result` will then either contain the return value of the `try` function, in case it succeeds. If it fails, the value from the `catch` function is returned. Any error thrown in the catch function will be passed through to the enclosing scope.

### Using finally

Besides `tryCatch`, there are also `tryCatchFinally` and `tryFinally` available:

```javascript
const result = tryCatchFinally(
  () => {
    // Try something...
  },
  ex => {
    // Return a default value or re-throw the exception.
  },
  () => {
    // Clean up.
  }
);

const result = tryFinally(
  () => {
    // Try something...
  },
  () => {
    // Clean up.
  }
);
```

Note that the return value of the finally function will be discarded, to avoid [confusing behavior](https://eslint.org/docs/rules/no-unsafe-finally).

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```
