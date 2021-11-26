import React from "react";
import { trimEthAddress, weiToEth } from "../helperFunctions";
import "./Header.css";

export default function Header({
  contractOwner,
  metamaskAddress,
  metamaskBalance,
  web3,
}) {
  return (
    <header className="header">
      <div className="left-items">
        <div>Owner: {trimEthAddress(contractOwner)}</div>
      </div>
      <div className="right-items">
        {contractOwner ? (
          <div className="d-flex align-items-center">
            <button className="button account-address">Ropsten</button>
            <div className="selected-account">
              <span className="account-balance">
                {weiToEth(metamaskBalance, web3)} ETH
              </span>
              <button className="button account-address">
                {trimEthAddress(metamaskAddress)}
              </button>
            </div>
          </div>
        ) : (
          <button
            className="btn btn-outline-primary my-2 my-sm-0 m-3"
            type="submit"
          >
            Switch network to Ropsten
          </button>
        )}
      </div>
    </header>
  );
}
