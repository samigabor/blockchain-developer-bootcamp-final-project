export function trimEthAddress(addr) {
  if (!addr) {
    return "";
  }
  return `${addr.toString().slice(0, 6)}...${addr.toString().slice(38)}`;
}

export function ethToWei(value, web3) {
  const valueString = `${+value}`;
  if (isNaN(valueString)) {
    return 0;
  }
  return web3.utils.toWei(valueString);
}

export function sumWeiValues(value1, value2, web3) {
  const BN = web3.utils.BN;
  return new BN(value1).add(new BN(value2));
}

export function weiToEth(value, web3, decimals = 4) {
  const valueString = `${+value}`;
  if (isNaN(valueString)) {
    return 0;
  }
  const ethValue = web3.utils.fromWei(value);
  const decimalsValue = 10 ** decimals;
  return Math.floor(ethValue * decimalsValue) / decimalsValue;
}
