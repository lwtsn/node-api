import * as dotenv from "dotenv";

dotenv.config();

export default {
  infuraNetworkAddress: process.env.INFURA_NETWORK_ADDRESS ?? "",
  infuraApiKey: process.env.INFURA_API_KEY ?? "",
  privateMnemonic: process.env.PRIVATE_MNEMONIC ?? "",
  privateKey: process.env.PRIVATE_KEY ?? "",
};
