import { BigNumber } from "ethers";
import { ERC20_ABI, ERC20_ADDRESS } from "../src/contracts/token";
import { WHALE_ACCOUNT, USDC_OWNER } from "./constants";
import { Erc20 } from "../src/typechain";

const oneEther = BigNumber.from(1).mul(BigNumber.from(10).pow(18));

const hre = require("hardhat");

async function main() {
  console.log("Starting...");
  const { ethers } = hre;

  const [alice] = await hre.ethers.getSigners();

  console.log("Hijacking whale account");
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [WHALE_ACCOUNT]
  });

  const hijackedAccount = ethers.provider.getSigner(WHALE_ACCOUNT);

  console.log("Sending Eth");
  await hijackedAccount.sendTransaction({
    to: alice.address,
    value: oneEther.mul(1),
    from: WHALE_ACCOUNT
  });

  console.log("Connecting to USDT contract for Whale address");
  let erc20 = await ethers.getContractAt(
    ERC20_ABI,
    ERC20_ADDRESS
  ) as Erc20;

  const hijackedErc20 = erc20.connect(hijackedAccount);

  console.log("Approving");
  await hijackedErc20.approve(WHALE_ACCOUNT, oneEther.mul(5000));

  console.log("Transferring 5000 USDC to our address");
  await hijackedErc20.transferFrom(
    WHALE_ACCOUNT,
    alice.address,
    10000
  );

  await erc20.balanceOf(alice.address).then((balance: BigNumber) => {
    console.log("Balance of alice is " + balance.toString())
  })


  console.log("Hijacking 0x account");
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [USDC_OWNER]
  });

  const hijackedUsdcOwner = ethers.provider.getSigner(USDC_OWNER);

  const hijackedUsdcOwnerErc20 = erc20.connect(hijackedUsdcOwner);

  console.log("Setting Alice as pauser");
  await hijackedUsdcOwnerErc20.updatePauser(alice.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
