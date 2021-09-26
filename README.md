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
