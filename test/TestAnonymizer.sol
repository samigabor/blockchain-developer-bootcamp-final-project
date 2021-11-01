// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Anonymizer.sol";

contract TestAnonymizer {
    function testItRuns() public {
        Anonymizer anonymizer = Anonymizer(DeployedAddresses.Anonymizer());

        Assert.equal(true, true, "It should run test file.");
    }
}
