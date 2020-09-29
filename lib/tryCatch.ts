const tryCatch = function<TTryResult, TCatchResult> (
  tryFunction: () => TTryResult,
  catchFunction: (ex: unknown) => TCatchResult
): TTryResult | TCatchResult {
  try {
    return tryFunction();
  } catch (ex: unknown) {
    return catchFunction(ex);
  }
};

export { tryCatch };
