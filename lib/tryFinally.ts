const tryFinally = function <TTryResult> (
  tryFunction: () => TTryResult,
  finallyFunction: () => void
): TTryResult | undefined {
  try {
    return tryFunction();
  } finally {
    finallyFunction();
  }
};

export { tryFinally };
