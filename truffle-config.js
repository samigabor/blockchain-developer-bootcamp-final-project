const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const secrets = JSON.parse(
  fs
    .readFileSync("./secrets/.secrets.json")
    .toString()
    .trim()
);

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(secrets.mnemonic, secrets.infuraKey);
      },
      network_id: "3",
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: secrets.etherscanKey,
  },
};
