import { HardhatUserConfig } from "hardhat/config";
import environment from "./config";

import "@nomiclabs/hardhat-ethers";
import "hardhat-typechain";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: environment.privateKey,
          balance: "50000"
        }
      ],
      forking: {
        enabled: true,
        url:
          `${environment.alchemyNetworkAddress}/${environment.alchemyApiKey}`
      }
    }
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5"
  }
};

export default config;
