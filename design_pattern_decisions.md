## Access Control - Ownable

- the smart contract inherits `Ownable` from openzeppelin library
- it uses the `onlyOwner` modifier to restrict access to **freezeDeposits** and **unfreezeDeposits** methods.

---

## Security - Pausable

- the smart contract inherits `Pausable` from openzeppelin library
- used to freeze/unfreeze deposits to the contract in case of an emergency/hack. Withdrawals are permitted while the contract is paused.
