const Anonymizer = artifacts.require("./Anonymizer.sol");

contract("Anonymizer", (accounts) => {
  const [accountOne, accountTwo, accountThree] = accounts;

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
      assert.equal(await instance.owner.call(), accountOne);
    });
  });

  describe("getBalance(_addr)", () => {
    it("should have an initial balance of zero for the first account", async () => {
      const result = await instance.getBalance(accountOne);
      assert.equal(
        result,
        0,
        "the initial balance for the first account is not zero"
      );
    });
  });

  describe("depositEth(_addr)", () => {
    it("shoult make a deposit of 1 ether", async () => {
      await instance.methods["depositEth(address)"](accountTwo, {
        from: accountOne,
        value: web3.utils.toWei("1", "ether"),
      });

      assert.equal(
        await instance.getBalance(accountTwo),
        web3.utils.toWei("1", "ether"),
        "the balance is not 1 ether"
      );
    });

    it("should emit a CurrentBalance event if deposit was successful", async () => {
      let eventEmitted = false;
      const tx = await instance.depositEth(accountTwo);
      if (tx.logs[0].event == "CurrentBalance") {
        eventEmitted = true;
      }
      assert.equal(
        eventEmitted,
        true,
        "making a deposit should emit a CurrentBalance event"
      );
    });
  });

  describe("depositEth(_addr, _amountToMyself)", () => {
    it("should make a deposit of 1 ether to accountTwo and 0.5 ether to accountOne", async () => {
      const amountToMyself = web3.utils.toWei("0.5", "ether");
      await instance.methods["depositEth(address,uint256)"](
        accountTwo,
        amountToMyself,
        {
          from: accountOne,
          value: web3.utils.toWei("1.5", "ether"),
        }
      );
      assert.equal(
        await instance.getBalance(accountTwo),
        web3.utils.toWei("1", "ether"),
        "the balance for accountTwo is not 1 ether"
      );
    });

    it("should emit a CurrentBalance event if deposits on both accounts were successful", async () => {
      let eventEmitted = false;
      const tx = await instance.withdrawEth(accountTwo, 0);
      if (tx.logs[0].event == "CurrentBalance") {
        eventEmitted = true;
      }
      assert.equal(
        eventEmitted,
        true,
        "making a deposit should emit a CurrentBalance event"
      );
    });
  });

  describe("contract instance", () => {
    it("should equal the sum of multiple deposits on multiple accounts", async () => {
      await instance.methods["depositEth(address)"](accountOne, {
        from: accountOne,
        value: web3.utils.toWei("0.1", "ether"),
      });
      await instance.methods["depositEth(address)"](accountTwo, {
        from: accountOne,
        value: web3.utils.toWei("0.2", "ether"),
      });
      await instance.methods["depositEth(address)"](accountThree, {
        from: accountOne,
        value: web3.utils.toWei("0.3", "ether"),
      });

      assert.equal(
        await web3.eth.getBalance(instance.address),
        web3.utils.toWei("0.6", "ether"),
        "the sum of the three deposits does'n equal 0.6 ether"
      );
    });
  });

  describe("withdrawEth(_addr, _amount)", () => {
    // TOTO: add withdraw funds test case

    it("should emit a CurrentBalance event if withdraw was successful", async () => {
      let eventEmitted = false;
      const tx = await instance.withdrawEth(accountTwo, 0);
      if (tx.logs[0].event == "CurrentBalance") {
        eventEmitted = true;
      }
      assert.equal(
        eventEmitted,
        true,
        "making a withdraw should emit a CurrentBalance event"
      );
    });
  });
});
