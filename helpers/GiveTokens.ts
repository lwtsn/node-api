import { BigNumber } from "ethers";
import { ERC20_ABI, ERC20_ADDRESS } from "../src/contracts/token";
import { WHALE_ACCOUNT } from "./constants";
import config from "../config";

const oneEther = BigNumber.from(1).mul(BigNumber.from(10).pow(18));

const hre = require("hardhat");

async function main() {
  console.log("Starting...");
  const { ethers } = hre;

  console.log("Hijacking token address");
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [ERC20_ADDRESS],
  });

  console.log("Getting signer");

  let daiOwner = await hre.ethers.provider.getSigner(WHALE_ACCOUNT);

  console.log("Sending Eth to test account");
  await daiOwner.sendTransaction({
    from: WHALE_ACCOUNT,
    value: oneEther.mul(4000),
    to: config.publicKey,
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
