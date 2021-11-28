import React from "react";
import { trimEthAddress, weiToEth } from "../helperFunctions";
import getNetwork from "../helpers/networks";
import "./Header.css";

export default function Header({
  contractOwner,
  metamaskAddress,
  metamaskBalance,
  networkId,
  web3,
}) {
  return (
    <header className="header">
      <div className="left-items">
        <div>Owner: {trimEthAddress(contractOwner)}</div>
      </div>
      <div className="right-items">
        <div className="d-flex align-items-center">
          <button className="button account-address">
            {getNetwork(networkId)}
          </button>
          <div className="selected-account">
            <span className="account-balance">
              {weiToEth(metamaskBalance, web3)} ETH
            </span>
            <button className="button account-address">
              {trimEthAddress(metamaskAddress)}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
