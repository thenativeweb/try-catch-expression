const tryCatch = function<TTryResult, TCatchResult> (
  tryFunction: () => TTryResult,
  catchFunction: (ex: Error) => TCatchResult
): TTryResult | TCatchResult {
  try {
    return tryFunction();
  } catch (ex) {
    return catchFunction(ex);
  }
};

export { tryCatch };
