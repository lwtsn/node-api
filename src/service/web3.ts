import { Provider } from "@ethersproject/providers";
import { ethers, Wallet } from "ethers";
import { Erc20 } from "../typechain";

import { ERC20_ABI, ERC20_ADDRESS } from "../contracts/token";
import config from "../../config";

let provider: Provider;
let wallet: Wallet;
let erc20: Erc20;

function getProvider() {
  if (undefined != provider) {
    return provider;
  }

  let url = `${config.infuraNetworkAddress}/${config.infuraApiKey}`;

  return (provider = new ethers.providers.JsonRpcProvider(url));
}

async function getWallet(): Promise<Wallet> {
  if (undefined != wallet) {
    return wallet;
  }

  return (wallet = ethers.Wallet.fromMnemonic(config.privateMnemonic).connect(
    getProvider()
  ));
}

export async function getTokenContract(): Promise<Erc20> {
  if (undefined != erc20) {
    return erc20;
  }

  let wallet = await getWallet();

  return (erc20 = new ethers.Contract(
    ERC20_ADDRESS,
    ERC20_ABI,
    wallet
  ) as Erc20);
}
