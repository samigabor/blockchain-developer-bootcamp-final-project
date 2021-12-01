// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

pragma solidity 0.8.10;

/**
 * @title App through which a layer of anonymity is added to peer-to-peer transactions
 * @author Sami Gabor
 * @notice study project which may have security vulnerabilities
 */
contract Anonymizer is Ownable, Pausable {
    /**
     * @dev users balances:
     * The key is the user's address(hashed to increase privacy)
     * The value is the user's balance
     **/
    mapping(address => uint256) private balances;

    /**
     * @dev events:
     * @param balance the updated eth balance for current user
     **/
    event CurrentBalance(uint256 indexed balance);

    /**
     * @notice Returns the ether balance available inside the contract
     * @return sender's contract balance
     **/
    function getBalance(address _addr) public view returns (uint256) {
        return balances[_addr];
    }

    /**
     * @notice Deposits funds into the contract and assignes them to the receiver
     * @dev increase receiver's contract balance
     * @dev emit the sender's current contract balance
     * @param _to the destination address to which the ether is assigned
     **/
    function depositEth(address _to) public payable whenNotPaused {
        require(msg.value > 0, "Amount sent must be greather than zero.");
        balances[_to] += msg.value;
        emit CurrentBalance(balances[msg.sender]);
    }

    /**
     * @notice Deposits funds into the contract and assignes them to the sender and the receiver
     * @notice By sending funds to your own address, it increases the transaction anonymity. The funds are kept within the contract and available for claim
     * @notice DO NOT KEEP LARGE AMOUNTS INTO THE CONTRACT, withdraw them every once in a while
     * @dev increase the receiver's contract balance
     * @dev increase the sender's contract balance
     * @param _to the destination address to which the ether is added
     * @param _toMyselfAmount the amount assigned back to sender(inside the contract) in order to increase the anonymity
     **/
    function depositEth(address _to, uint256 _toMyselfAmount)
        public
        payable
        whenNotPaused
    {
        require(
            _toMyselfAmount > 0 && msg.value > _toMyselfAmount,
            "The total amount must be greather than the amount deposited back to sender"
        );
        uint256 _toAmount = msg.value - _toMyselfAmount;
        balances[_to] += _toAmount;
        balances[msg.sender] += _toMyselfAmount;
        emit CurrentBalance(balances[msg.sender]);
    }

    /**
     * @notice Withdraw funds, assigned to own address, from the contract
     * @notice DO NOT KEEP LARGE AMOUNTS INTO THE CONTRACT, withdraw them every once in a while
     * @dev withwraw from the contract and decrease the sender's balance
     **/
    function withdrawEth(address payable _to, uint256 _amount) public {
        require(_amount > 0, "Amount withdrawn must be greather than zero.");
        require(balances[msg.sender] >= _amount, "Insufficient funds.");
        balances[msg.sender] -= _amount;
        (bool sent, ) = _to.call{value: _amount}("");
        require(sent, "Failed to send Ether");
        emit CurrentBalance(balances[msg.sender]);
    }

    /**
     * @notice Pause deposits into the contract
     **/
    function freezeDeposits() external onlyOwner {
        _pause();
    }

    /**
     * @notice Resume deposits into the contract
     **/
    function unfreezeDeposits() external onlyOwner {
        _unpause();
    }
}
