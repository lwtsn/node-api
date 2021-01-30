import { HardhatUserConfig } from "hardhat/config";
import environment from "./config";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: `${environment.infuraNetworkAddress}/${environment.infuraApiKey}`,
      },
    },
    // rinkleby: {
    //   url: `${environment.infuraNetworkAddress}/${environment.infuraApiKey}`,
    //   accounts: [environment.privateKey],
    // },
  },
};

export default config;
