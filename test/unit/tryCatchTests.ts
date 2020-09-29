import { assert } from 'assertthat';
import { tryCatch } from '../../lib';

suite('tryCatch', (): void => {
  test('returns the return value from the try function, if it does not throw an exception.', async (): Promise<void> => {
    const result = tryCatch(
      (): string => 'foo',
      (): string => 'bar'
    );

    assert.that(result).is.equalTo('foo');
  });

  test('does not call the catch function, if the try function does not throw an exception.', async (): Promise<void> => {
    let calledCatchFunction = false;

    tryCatch(
      (): string => 'foo',
      (): string => {
        calledCatchFunction = true;

        return 'bar';
      }
    );

    assert.that(calledCatchFunction).is.false();
  });

  test('returns the return value from the catch function, if the try function throws an exception.', async (): Promise<void> => {
    const result = tryCatch(
      (): never => {
        throw new Error('foo');
      },
      (): string => 'bar'
    );

    assert.that(result).is.equalTo('bar');
  });

  test('passes the exception thrown by the try function to the catch function.', async (): Promise<void> => {
    const error = new Error('foo');

    tryCatch(
      (): never => {
        throw error;
      },
      (ex: unknown): void => {
        assert.that(ex).is.equalTo(error);
      }
    );
  });
});
