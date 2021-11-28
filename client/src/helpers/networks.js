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
