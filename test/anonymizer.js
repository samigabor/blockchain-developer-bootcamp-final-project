const Anonymizer = artifacts.require("./Anonymizer.sol");

contract("Anonymizer", (accounts) => {
  const [firstAccount, secondAccount] = accounts;

  let instance;
  beforeEach(async () => {
    instance = await Anonymizer.new();
  });

  describe("owner", () => {
    it("should have an owner", async () => {
      assert.equal(
        typeof instance.owner,
        "function",
        "the contract has no owner"
      );
    });

    it("shoult set the owner", async () => {
      assert.equal(await instance.owner.call(), firstAccount);
    });
  });

  describe("getBalance(_addr)", () => {
    it("should have an initial balance of zero for the first account", async () => {
      const result = await instance.getBalance(firstAccount);
      assert.equal(
        result,
        0,
        "the initial balance for the first account is not zero"
      );
    });
  });

  describe("depositEth(_addr)", () => {
    it("should emit a DepositerEthBalance event", async () => {
      let eventEmitted = false;
      const tx = await instance.depositEth(secondAccount);
      if (tx.logs[0].event == "DepositerEthBalance") {
        eventEmitted = true;
      }
      assert.equal(
        eventEmitted,
        true,
        "making a deposit should emit a DepositerEthBalance event"
      );
    });
  });

  describe("withdrawEth(_addr, _amount)", () => {
    it("should emit a EthWithdraw event", async () => {
      let eventEmitted = false;
      const tx = await instance.withdrawEth(secondAccount, 0);
      if (tx.logs[0].event == "EthWithdraw") {
        eventEmitted = true;
      }
      assert.equal(
        eventEmitted,
        true,
        "making a withdraw should emit an EthWithdraw event"
      );
    });
  });
});
