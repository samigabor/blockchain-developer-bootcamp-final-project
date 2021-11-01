var Anonymizer = artifacts.require("./Anonymizer.sol");

module.exports = function (deployer) {
  deployer.deploy(Anonymizer);
};
