## SWC-107 - Re-entrancy

Use the `Checks-Effects-Interactions Pattern` => first perform some checks(valid arguments/who called the function/enough eth was sent), if all checks passed, update the state variables of the current contract and lastly perform the interaction with other contracts(transfer funds).

## SWC-103 - Floating pragma

Locked pragma to `0.8.10`.
Contracts are deployed with the same compiler version and flags that they have been tested with thoroughly.
