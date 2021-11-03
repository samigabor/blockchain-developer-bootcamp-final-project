import React, { Component } from "react";
import AnonymizerContract from "./contracts/Anonymizer.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    contractOwner: null,
    contractBalance: 0,
    metamaskAddress: null,
    metamaskBalance: 0,
    depositValue: 0,
    isDepositing: true,
    withdrawValue: 0,
    destinationAddress: null,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      const metamaskBalance = await web3.eth.getBalance(accounts[0]);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = AnonymizerContract.networks[networkId];
      const instance = new web3.eth.Contract(
        AnonymizerContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
        {
          web3,
          accounts,
          contract: instance,
          metamaskAddress: accounts[0],
          metamaskBalance,
        },
        this.runExample
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { metamaskAddress, contract } = this.state;

    // Get the value from the contract to prove it worked.
    const contractOwner = await contract.methods.owner().call();
    const contractBalance = await contract.methods
      .getBalance(metamaskAddress)
      .call();

    // Update state with the result.
    this.setState({ contractOwner, contractBalance });
  };

  trimEthAddress = (addr) => {
    if (!addr) {
      return "";
    }
    return `${addr.toString().slice(0, 6)}...${addr.toString().slice(38)}`;
  };

  ethToWei = (value) => {
    const { web3 } = this.state;
    const valueString = `${+value}`;
    if (isNaN(valueString)) {
      return 0;
    }
    return web3.utils.toWei(valueString);
  };

  weiToEth = (value, decimals = 4) => {
    const { web3 } = this.state;
    const valueString = `${+value}`;
    if (isNaN(valueString)) {
      return 0;
    }
    const ethValue = web3.utils.fromWei(valueString);
    const decimalsValue = 10 ** decimals;
    return Math.round(ethValue * decimalsValue) / decimalsValue;
  };

  depositEth = async () => {
    const { contract, web3, metamaskAddress, depositValue } = this.state;

    contract.methods
      .depositEth()
      .send({
        from: metamaskAddress,
        value: depositValue,
      })
      .then(async (result) => {
        const contractBalance = result.events.EthDeposit.returnValues.balance;
        const metamaskBalance = await web3.eth.getBalance(metamaskAddress);
        this.setState({ contractBalance, metamaskBalance });
      });
  };

  withdrawEth = async (e) => {
    e.preventDefault();

    const {
      contract,
      web3,
      metamaskAddress,
      destinationAddress,
      withdrawValue,
    } = this.state;

    contract.methods
      .withdrawEth(destinationAddress, withdrawValue)
      .send({
        from: metamaskAddress,
      })
      .on("transactionHash", (hash) => {
        console.log(
          `View Transaction on Etherscan: https://etherscan.io/tx/${hash}`
        );
      })
      .on("receipt", async (receipt) => {
        console.log(
          `Transaction has been mined in block ${receipt.blockNumber}.`
        );
        const contractBalance = receipt.events.EthWithdraw.returnValues.balance;
        const metamaskBalance = await web3.eth.getBalance(metamaskAddress);
        this.setState({ contractBalance, metamaskBalance });
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        console.log(`Transaction confirmed ${confirmationNumber}`);
      })
      .on("error", (err) => {
        console.log("Withdraw eth arror:", err);
      })
      .then((result) => {
        const contractBalance = result.events.EthWithdraw.returnValues.balance;
        this.setState({ contractBalance });
        console.log(
          `Transaction completed with returned value: ${contractBalance}`
        );
      });
  };

  updateDepositValue = (event) => {
    const depositValue = this.ethToWei(event.target.value);
    this.setState({ depositValue });
  };

  updateWithdrawValue = (event) => {
    const withdrawValue = this.ethToWei(event.target.value);
    this.setState({ withdrawValue });
  };

  updateWithdrawAddress = (event) => {
    // TODO: add eth address validation
    this.setState({ destinationAddress: event.target.value });
  };

  toggleContractAction = (isDepositing) => {
    this.setState({ isDepositing });
  };

  render() {
    const {
      web3,
      contractOwner,
      contractBalance,
      metamaskAddress,
      metamaskBalance,
      isDepositing,
    } = this.state;

    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="_">
            Owner: {this.trimEthAddress(contractOwner)}
          </a>

          {contractOwner ? (
            <div>
              <span className="navbar-text m-3">
                Available to withdraw: {this.weiToEth(contractBalance)} ETH
              </span>
              <span className="navbar-text m-3">
                Available to deposit: {this.weiToEth(metamaskBalance)} ETH
              </span>
              <span className="navbar-text m-3">
                {this.trimEthAddress(metamaskAddress)}
              </span>
            </div>
          ) : (
            <button
              className="btn btn-outline-primary my-2 my-sm-0 m-3"
              type="submit"
            >
              Connect Wallet
            </button>
          )}
        </nav>
        <main className="main-container">
          <div>
            <div className="main-header">
              <span
                className={isDepositing ? "active" : ""}
                onClick={() => this.toggleContractAction(true)}
              >
                Deposit to contract
              </span>
              <span
                className={isDepositing ? "" : "active"}
                onClick={() => this.toggleContractAction(false)}
              >
                Withdraw from contract
              </span>
            </div>

            <div className="main-body">
              {isDepositing ? (
                <div className="row-body">
                  <p className="row-label">Amount to deposit:</p>
                  <input
                    type="text"
                    placeholder="0.0"
                    onChange={this.updateDepositValue}
                  />
                </div>
              ) : (
                <>
                  <div className="row-body">
                    <p className="row-label">Amount to withdraw:</p>
                    <input
                      type="text"
                      placeholder="0.0"
                      onChange={this.updateWithdrawValue}
                    />
                  </div>
                  <div className="row-body">
                    <p className="row-label">Destination address:</p>
                    <input
                      type="text"
                      placeholder="0x000000"
                      onChange={this.updateWithdrawAddress}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="main-footer">
              <button
                className="btn btn-primary submit-btn"
                onClick={isDepositing ? this.depositEth : this.withdrawEth}
              >
                Send
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
