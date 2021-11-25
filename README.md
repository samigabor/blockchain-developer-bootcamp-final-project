# Anonymizer

## Project Description

Decentralized app which adds a layer of anonymity for peer-to-peer transfers. Useful for users who want to make a payment without exposing their entire transaction history.

---

## Simple workflow

- Let's imagine Alice wants to send ETH to Bob. In order to do that Alice knows Bos's public address.

- Alice goes to the _Send_ tab and types Bob's public address and the amount to send. Optionally, Alice can add an extra amount and make it even harder for Bob to track the transaction back to her since the amounts transacted are now different. Any extra amounts added by Alice can be claimed at any time. Clicks **Send** button and MetaMask will open to confirm the transaction.
- Bob goes to the _Claim_ tab and will see the amount sent by Alice(plus any other amount he already had there, if any). Clicks **Claim** button and MetaMask will open to confirm the transaction.
- Now if Bob tries to analize EtherScan to see Alice's assets and transaction history, he will see the funds came from a contract.
- Some guesses are still possible using the amount and the time the transaction was sent if analizing the contract history.

---

## How to access the deployed project:

- front-end hosted on [Github Pages](https://samigabor.github.io/blockchain-developer-bootcamp-final-project/)

- smart contract deployed on [Rospten](https://ropsten.etherscan.io/address/0x9fA5bAd61321C783ccD3f10409743665F4A407dD#code)

<span style="color: orange"> WARNING: </span>
Have MateMask installed and select the Ropsten network.
If a different network is selected, then change it to Ropsten and refresh the page. Any time the account is changed, a page refresh is needed.

---

## Directory Structure

The structure was generated running `truffle unbox react` and contains:

- `client`: contains the front-end built with React
- `contracts`: contains the smart contract deployed to Ropsten
- `migrations`: contains the migration files for deploying the contracts from the **contracts** directory
- `test`: contins the test files for smart contracts

---

## How to run the project locally:

### Prerequisites:

- node v16
- npm v8
- truffle v5
- ganache-cli v6

### Download the project:

- `git clone https://github.com/samigabor/blockchain-developer-bootcamp-final-project.git`
- `cd blockchain-developer-bootcamp-final-project`

### Migrate the smart contracts:

- `npm install` - install the smart contract dependencies at root level
- `ganache-cli -p 8545` - start a local ethereum blockchain and simulate full client behavior
- `truffle compile` - compile smart contracts
- `truffle migrate` - migrate the smart contracts locally (_--network development_ is optional)

### Start the front-end:

- `cd client` - go to the client directory
- `npm install` - install client dependencies
- `npm run start` - run the application locally
- go to `http://localhost:3000` (if not automatically redirected)

### Run smart contract tests:

- `truffle test` at project root level

### Add localhost into MetaMask (Custom RPC network):

- `Network Name`: Localhost 8545
- `New RPC URL`: http://localhost:8545
- `Chain ID`: 1337
- `Currency Symbol (optional)`: ETH

### Import ganache-cli generated accounts into MetaMask:

- Under `Import Accounts` paste the private key generated by `ganache-cli`

---

## Screencast walking through the project

TODO

---

## Public Ethereum account for certification NFT:

`0x1C2b35F78987953519224B313960c086722BD9E4`

---

## TODO features:

- implement emergency stop functionality
- implement upgradable contract functionality
- optimize gas usage
- display loading spinner while the transaction is pending
- etherscan redirect while the transaction is pending
- once the transaction is finalized on the blockchain, remove loading spinner and displpay success/failed transaction message(self-closing toastr in the upper-right corner)
- automate the 2 spteps proccess (Send/Claim) into a single action made by sender.
- save(interact with) a hash of the user's address on the contract to avoid saving users' addresses onto the blockchain
- accept/display ENS domain names
- implement a light/dark theme
