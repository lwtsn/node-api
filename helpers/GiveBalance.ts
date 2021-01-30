import { BigNumber } from "ethers";
import { ERC20_ABI, ERC20_ADDRESS } from "../src/contracts/token";
import { DAI_OWNER } from "./constants";

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
  let daiOwner = await hre.ethers.provider.getSigner(DAI_OWNER);

  console.log("Sending Eth to me");
  await daiOwner.sendTransaction({
    from: DAI_OWNER,
    value: oneEther.mul(4000),
    to: ME,
  });

  // await daiOwner.sendTransaction({
  //   from: DAI_OWNER,
  //   value: oneEther.mul(4000),
  //   to: ME,
  // });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
