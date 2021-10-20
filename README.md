# blockchain-developer-bootcamp-final-project

Descentralized protocol which adds an extra layer of anonymity for transfers within the ethereum space. Useful for users who wants to make a payment but don't want to expose their entire transaction history.

Other alternatives(better anonymity but less convenient) to achive this:

1. send funds through/from a centralised exchange
2. use a mixer/tumbler

## General Layout

### Header items:

- `user's network`
- `user's address`
- `user's contract balance`
- `user's MetaMask balance`

### Main container items:

- `input field 1` - destination address
- `input field 2` - amount to send to destination address
- `input field 3` - amount to deposit into contract
- `Send` button

## User workflow

- auto-detect user wallet(MetaMask). For first-time users prompt to connect the wallet. Add fallback button to connect the wallet manually
- auto-detect user network and prompt user to change it if necessary
- user types the destination address, the amount to send and optionally the Deposit To Contract amount
- if sending to own address the funds are deposited into the contract(increases privacy but also the risk - the contract becomes a honey pot) and destination address field becomes disabled
- on Send button click MetaMask opens to confirm the transaction. The ETH amount(send + deposit) is pre-filled into MetaMask
- display loading spinner while the transaction is pendings
- once the transaction is finalized on the blockchain, remove loading spinner and displpay success/failed transaction message(self-closing toastr in the upper-right corner)

## How it works

User funds are sent to a smart contract and the smart contract makes another transaction to the receiver. The more funds the contract has, the better the anonymity is

## Nice-To-Have features:

- theme light/dark
- etherscan redirect while the transaction is pending
- a toggle Deposit To Contract button which pre-fills the destination address with own address and disables destination address and amount to send(remains active amount to deposit). The reverse is valid as well: if own address is typed, the Deposit To Contract button is toggled ON and destination address and amount to send are disabled.
- accept ENS domain format

## Technical Challenges:

- save(interact with) a hash of the user's address on the contract/blockchain to increase user privacy
- receive and send ether within the same block vs. receive ether into the contract in one block and send ether from the contract in a following block
- implement emergency stop
- implement upgradable contract
- optimize gas usage
