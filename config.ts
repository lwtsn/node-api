import * as dotenv from "dotenv";

dotenv.config();

export default {
  ethereumNetworkAddress: process.env.ETHEREUM_NETWORK_ADDRESS ?? "",
  alchemyNetworkAddress: process.env.ALCHEMY_NETWORK_ADDRESS ?? "",
  alchemyApiKey: process.env.ALCHEMY_API_KEY ?? "",
  privateMnemonic: process.env.PRIVATE_MNEMONIC ?? "",
  privateKey: process.env.PRIVATE_KEY ?? "",
  publicKey: process.env.PUBLIC_KEY ?? "",
};
