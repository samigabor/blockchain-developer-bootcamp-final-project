const Anonymizer = artifacts.require("./Anonymizer.sol");

contract("Anonymizer", (accounts) => {
  it("...should run test.", async () => {
    const anonymizerInstance = await Anonymizer.deployed();

    assert.equal(true, true, "The test didn't run.");
  });
});
