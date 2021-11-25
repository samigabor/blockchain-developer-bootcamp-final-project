## Inheritance and Interfaces

- inherits `Ownable` and `Pausable` from openzeppelin library

## Access Control Design Patterns - Ownable

- it uses the `onlyOwner` modifier to restrict access to **freezeDeposits** and **unfreezeDeposits** methods.

---

## Security - Pausable

- used to freeze/unfreeze deposits to the contract in case of an emergency/hack. Withdrawals are permitted while the contract is paused.

## Checks-Effects-Interactions Pattern

- `depositEth()`

  - first check if the user satisfies the deposit requirements
  - second, if all checks passed, the state of the contract is updated(the user's contract balance)
  - external intercation(transfer funds/emit events)

- `withdrawEth()`
  - first check if the user has the requested amount
  - second, if all checks passed, the state of the contract is updated(the user's contract balance)
  - external intercation(transfer funds/emit events)
