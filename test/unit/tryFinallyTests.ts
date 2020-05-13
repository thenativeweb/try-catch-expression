import { assert } from 'assertthat';
import { tryFinally } from '../../lib';

suite('tryFinally', (): void => {
  test('returns the return value of the try function, if it does not throw an error.', async (): Promise<void> => {
    const result = tryFinally(
      (): string => 'foo',
      (): void => {
        // Intentionally left empty.
      }
    );

    assert.that(result).is.equalTo('foo');
  });

  test('throws an exception, if the try function throws an exception.', async (): Promise<void> => {
    assert.that((): void => {
      tryFinally(
        (): string => {
          throw new Error('foo');
        },
        (): string => 'foo'
      );
    }).is.throwing('foo');
  });

  test('calls the finally function, if the try function throws an exception.', async (): Promise<void> => {
    let calledFinallyFunction = false;

    try {
      tryFinally(
        (): string => {
          throw new Error('foo');
        },
        (): void => {
          calledFinallyFunction = true;
        }
      );
    } catch {
      // Intentionally left empty.
    }

    assert.that(calledFinallyFunction).is.true();
  });

  test('calls the finally function, if the try function does not throw an exception.', async (): Promise<void> => {
    let calledFinallyFunction = false;

    tryFinally(
      (): string => 'foo',
      (): void => {
        calledFinallyFunction = true;
      }
    );

    assert.that(calledFinallyFunction).is.true();
  });
});
