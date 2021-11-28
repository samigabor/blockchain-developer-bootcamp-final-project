import React, { Component } from "react";
import AnonymizerContract from "./contracts/Anonymizer.json";
import getWeb3 from "./getWeb3";
import Header from "./components/Header";
import Message from "./components/Message";
import logo from "./assets/images/eth.png";
import getNetwork from "./helpers/networks";
import { ethToWei, weiToEth, sumWeiValues } from "./helperFunctions";

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
    depositToMyselfValue: 0,
    isDepositing: true,
    withdrawValue: 0,
    destinationAddress: null,
    networkId: 0,
    message: {
      title: "",
      variant: "success",
    },
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
          networkId,
        },
        this.loadContract
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  loadContract = async () => {
    const { metamaskAddress, contract } = this.state;

    try {
      const contractBalance = await contract.methods
        .getBalance(metamaskAddress)
        .call();
      const contractOwner = await contract.methods.owner().call();
      this.setState({ contractOwner, contractBalance });
    } catch (error) {
      this.setState({
        message: {
          title: `Switch to ${getNetwork(3)} or Localhost:8545`,
          variant: "error",
        },
      });
      console.error(error.message);
    }
  };

  depositEth = async () => {
    const {
      contract,
      web3,
      metamaskAddress,
      depositValue,
      depositToMyselfValue,
    } = this.state;

    depositToMyselfValue
      ? contract.methods
          .depositEth(this.state.destinationAddress, depositToMyselfValue)
          .send({
            from: metamaskAddress,
            value: sumWeiValues(depositValue, depositToMyselfValue, web3),
          })
          .then(async (result) => {
            const contractBalance =
              result.events.CurrentBalance.returnValues.balance;
            const metamaskBalance = await web3.eth.getBalance(metamaskAddress);
            this.setState({ contractBalance, metamaskBalance });
          })
      : contract.methods
          .depositEth(this.state.destinationAddress)
          .send({
            from: metamaskAddress,
            value: depositValue,
          })
          .then(async (result) => {
            const contractBalance =
              result.events.CurrentBalance.returnValues.balance;
            const metamaskBalance = await web3.eth.getBalance(metamaskAddress);
            this.setState({ contractBalance, metamaskBalance });
          });
  };

  withdrawEth = async (e) => {
    e.preventDefault();

    const { contract, web3, metamaskAddress, withdrawValue } = this.state;

    contract.methods
      .withdrawEth(metamaskAddress, withdrawValue)
      .send({
        from: metamaskAddress,
      })
      .on("transactionHash", (hash) => {
        console.log(
          `View Transaction on Ropsten Etherscan: https://ropsten.etherscan.io/tx/${hash}`
        );
      })
      .on("receipt", async (receipt) => {
        console.log(
          `Transaction has been mined in block ${receipt.blockNumber}.`
        );
        const contractBalance =
          receipt.events.CurrentBalance.returnValues.balance;
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
        const contractBalance =
          result.events.CurrentBalance.returnValues.balance;
        this.setState({ contractBalance });
        console.log(
          `Transaction completed with returned value: ${contractBalance}`
        );
      });
  };

  updateDepositValue = (event) => {
    const depositValue = ethToWei(event.target.value, this.state.web3);
    this.setState({ depositValue });
  };

  updateDepositToMyselfValue = (event) => {
    const depositToMyselfValue = ethToWei(event.target.value, this.state.web3);
    this.setState({ depositToMyselfValue });
  };

  updateWithdrawValue = (event) => {
    const withdrawValue = ethToWei(event.target.value, this.state.web3);
    this.setState({ withdrawValue });
  };

  updateDestinationAddress = (event) => {
    // TODO: add eth address validation
    this.setState({ destinationAddress: event.target.value });
  };

  toggleContractAction = (isDepositing) => {
    this.setState({ isDepositing });
  };

  fillMaxDeposit = () => {
    const { metamaskBalance } = this.state;
    this.setState({ depositValue: metamaskBalance });
  };

  fillMaxClaim = () => {
    const { contractBalance } = this.state;
    this.setState({ withdrawValue: contractBalance });
  };

  render() {
    const {
      web3,
      contractOwner,
      metamaskAddress,
      metamaskBalance,
      networkId,
      contractBalance,
      isDepositing,
    } = this.state;

    if (!web3) {
      return (
        <Message
          title="Loading Web3, accounts, and contract..."
          variant="error"
        />
      );
    }

    return (
      <div>
        <Header
          contractOwner={contractOwner}
          metamaskAddress={metamaskAddress}
          metamaskBalance={metamaskBalance}
          networkId={networkId}
          web3={web3}
        />

        <Message
          title={this.state.message.title}
          variant={this.state.message.variant}
        />
        <main className="main-container">
          <div className="main-container-box">
            <div className="main-header">
              <p
                className={isDepositing ? "active" : "inactive"}
                onClick={() => this.toggleContractAction(true)}
              >
                Send...
              </p>
              <p
                className={isDepositing ? "inactive" : "active"}
                onClick={() => this.toggleContractAction(false)}
              >
                Claim
              </p>
            </div>

            <div className="main-body">
              {isDepositing ? (
                <>
                  <div className="row-body">
                    <div className="send-token">
                      <button className="token-button">
                        <img className="token-img" src={logo} alt="logo" />
                        <span className="token-label">ETH</span>
                      </button>
                      <p className="max-balance">
                        Balance: {weiToEth(metamaskBalance, web3, 2)} ETH
                        {/* TODO: add Max button functionality */}
                        {/* <button
                          className="max-button"
                          onClick={this.fillMaxDeposit}
                        >
                          (Max)
                        </button> */}
                      </p>
                    </div>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="0.0"
                      onChange={this.updateDepositValue}
                      // TODO: load max value
                      // value={this.weiToEth(this.state.depositValue)}
                    />
                  </div>
                  <div className="row-body">
                    <p className="row-label">To:</p>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="0x000000"
                      onChange={this.updateDestinationAddress}
                    />
                  </div>
                  <div className="row-body">
                    <p className="max-balance">Extra deposit (optional)</p>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="0.0"
                      onChange={this.updateDepositToMyselfValue}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="row-body extra-margin">
                    <div className="send-token">
                      <button className="token-button">
                        <img className="token-img" src={logo} alt="logo" />
                        <span className="token-label">ETH</span>
                      </button>
                      <p className="max-balance">
                        Balance: {weiToEth(contractBalance, web3, 2)} ETH
                        {/* TODO: add Max button functionality */}
                        {/* <button
                          className="max-button"
                          onClick={this.fillMaxClaim}
                        >
                          (Max)
                        </button> */}
                      </p>
                    </div>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="0.0"
                      onChange={this.updateWithdrawValue}
                      // TODO: load max value
                      // value={this.weiToEth(this.state.withdrawValue)}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="main-footer">
              <button
                className="btn btn-primary submit-button"
                onClick={isDepositing ? this.depositEth : this.withdrawEth}
              >
                {isDepositing ? "Send" : "Claim"}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
