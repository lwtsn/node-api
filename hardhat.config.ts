import { HardhatUserConfig } from "hardhat/config";
import environment from "./config";

import "@nomiclabs/hardhat-ethers";
import "hardhat-typechain";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.6.8",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url:
          "https://eth-mainnet.alchemyapi.io/v2/aY23iBDYGmLE7QvHpqRpkLoUBfm1xBme",
      },
    },
  },
};

export default config;
