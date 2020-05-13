import { assert } from 'assertthat';
import { tryCatchFinally } from '../../lib';

suite('tryCatchFinally', (): void => {
  test('returns the return value of the try function, if it does not throw an exception.', async (): Promise<void> => {
    const result = tryCatchFinally(
      (): string => 'foo',
      (): string => 'bar',
      (): void => {
        // Intentionally left empty.
      }
    );

    assert.that(result).is.equalTo('foo');
  });

  test('does not call the catch function, if the try function does not throw an exception.', async (): Promise<void> => {
    let calledCatchFunction = false;

    tryCatchFinally(
      (): string => 'foo',
      (): string => {
        calledCatchFunction = true;

        return 'bar';
      },
      (): void => {
        // Intentionally left empty.
      }
    );

    assert.that(calledCatchFunction).is.false();
  });

  test('calls the finally function, if the try function does not throw an exception.', async (): Promise<void> => {
    let calledFinallyFunction = false;

    tryCatchFinally(
      (): string => 'foo',
      (): string => 'bar',
      (): void => {
        calledFinallyFunction = true;
      }
    );

    assert.that(calledFinallyFunction).is.true();
  });

  test('returns the return value from the catch function, if the try function throws an exception.', async (): Promise<void> => {
    const result = tryCatchFinally(
      (): never => {
        throw new Error('foo');
      },
      (): string => 'bar',
      (): void => {
        // Intentionally left empty.
      }
    );

    assert.that(result).is.equalTo('bar');
  });

  test('calls the finally function, if the try function throws an exception.', async (): Promise<void> => {
    let calledFinallyFunction = false;

    tryCatchFinally(
      (): never => {
        throw new Error('foo');
      },
      (): string => 'bar',
      (): void => {
        calledFinallyFunction = true;
      }
    );

    assert.that(calledFinallyFunction).is.true();
  });

  test('passes the exception thrown by the try function to the catch function.', async (): Promise<void> => {
    const error = new Error('foo');

    tryCatchFinally(
      (): never => {
        throw error;
      },
      (ex: Error): void => {
        assert.that(ex).is.equalTo(error);
      },
      (): void => {
        // Intentionally left empty.
      }
    );
  });

  test('throws an exception if the try function and the catch function throw an exception.', async (): Promise<void> => {
    assert.that((): void => {
      tryCatchFinally(
        (): never => {
          throw new Error('foo');
        },
        (): never => {
          throw new Error('bar');
        },
        (): void => {
          // Intentionally left empty.
        }
      );
    }).is.throwing('bar');
  });
});
