# blockchain-developer-bootcamp-final-project

Descentralized protocol which adds an extra layer of anonimity for transfers within the ethereum space. Useful for users who wants to make a payment but don't want to expose their entire transaction history.

Other alternative(better anonimity but less convenient) to achive this:

1. send funds through/from a centralised exchange
2. use a mixer/tumbler

## User interaction

- type the amount to send
- type the receiver address
- approve send from MetaMask
- optional features: add transaction delay to increase anonimity / display user balance / ability for user to keep his/her funds inside the protocol

## How it works

User funds are sent to a smart contract and the smart contract makes another transaction to the receiver. The more funds the contract has, the better the anonimity is.

## General Layout

### Header items:

- network
- address
- contract balance
- MetaMask balance

### Main container items:

- input field 1 - destination address
- input field 2 - amount to send to destination address
- input field 3 - amount to deposit into contract
- `Send` button

## User workflow

- auto-detect user wallet(MetaMask). For first-time users prompt to connect the wallet. Add fallback button to connect the wallet manually
- auto-detect user network and prompt user to change it if necessary
- if sending to own address the funds are deposited into the contract(increases privacy but also the risk - the contract becomes a honey pot) and input field 2 becomes disabled
- on Send button click MetaMask opens to confirm the transaction. The ETH amount(required + optional) is pre-filled into MetaMask
- display loading spinner while the transaction is pending
- once the transaction is finalized on the blockchain, remove loading spinner and displpay success/failed transaction message(self-closing toastr in the upper-right corner)

## Technical Challenges:

- save(interact with) a hash of the user's address on the contract/blockchain to increase user privacy
- receive and send ether within the same block vs. receive ether into the contract in one block and send ether from the contract in a following block

### Nice-To-Have features:

- theme light/dark
- etherscan redirect while the transaction is pending
- toggle `Deposit To Contract` button which pre-fills the destination address with own address and disables input fields 1 and 2. The reverse is valid as well: if own address is typed, the Deposit To Contract button is toggled and input fields 1 and 2 are disabled.
- accept ENS domain format

