async function shouldThrow(promise) {
  try {
    await promise;
    assert(true, "The contract throw.");
  } catch (err) {
    assert(false, "The contract did not throw.");
  }
}

module.exports = {
  shouldThrow,
};