const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const secrets = JSON.parse(
  fs.readFileSync("./secrets/.secrets.json").toString().trim()
);

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
    },
    ropsten: {
      provider: function () {
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
};
