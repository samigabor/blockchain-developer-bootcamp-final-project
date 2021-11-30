export default function getNetwork(chainId) {
  switch (chainId) {
    case 0x1 || 1:
      return "Ethereum Main Network (Mainnet)";

    case 0x3 || 3:
      return "Ropsten Test Network";

    case 0x4 || 4:
      return "Rinkeby Test Network";

    case 0x5 || 5:
      return "Goerli Test Network";

    case 0x2a || 242:
      return "Kovan Test Network";

    case 1337:
      return "Localhost Network";

    case 1637918177947:
      return "Localhost:8545";

    default:
      return "Unknown Network";
  }
}

export function getEtherscanLink(hash, chainId) {
  let network;

  switch (chainId) {
    case 0x1 || 1:
      network = "";
      break;

    case 0x3 || 3:
      network = "ropsten";
      break;

    case 0x4 || 4:
      network = "rinkeby";
      break;

    case 0x5 || 5:
      network = "goerli";
      break;

    case 0x2a || 242:
      network = "kovan";
      break;

    default:
      network = "localhost";
  }

  return `https://${network}.etherscan.io/tx/${hash}`;
}
