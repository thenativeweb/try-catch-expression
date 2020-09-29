const tryCatchFinally = function <TTryResult, TCatchResult> (
  tryFunction: () => TTryResult,
  catchFunction: (ex: unknown) => TCatchResult,
  finallyFunction: () => void
): TTryResult | TCatchResult {
  let result;

  try {
    result = tryFunction();
  } catch (ex: unknown) {
    result = catchFunction(ex);
  } finally {
    finallyFunction();
  }

  return result;
};

export { tryCatchFinally };
