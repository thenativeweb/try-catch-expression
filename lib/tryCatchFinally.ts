const tryCatchFinally = function <TTryResult, TCatchResult> (
  tryFunction: () => TTryResult,
  catchFunction: (ex: Error) => TCatchResult,
  finallyFunction: () => void
): TTryResult | TCatchResult {
  let result;

  try {
    result = tryFunction();
  } catch (ex) {
    result = catchFunction(ex);
  } finally {
    finallyFunction();
  }

  return result;
};

export { tryCatchFinally };
