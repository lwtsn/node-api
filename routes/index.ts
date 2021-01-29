import { Router } from "express";
import { ethers } from "ethers";
import { Erc20 } from "../typechain";

import ERC20_ABI from "../contracts/Abi/Erc20.json";
import { ERC20_ADDRESS } from "../contracts";

const provider = new ethers.providers.JsonRpcProvider(
  "https://rinkeby.infura.io/v3/73bd0ea4c5d64e248551358ec2f1a8c3"
);

const wallet = ethers.Wallet.createRandom().connect(provider);

const tokenContract = new ethers.Contract(
  ERC20_ADDRESS,
  ERC20_ABI.abi,
  wallet
) as Erc20;

const router = Router();

/* GET home page. */
router.get("/", function (request, response, next) {
  response.render("index", { title: "Centralex" });
});

router.get("/token", async (req, response) => {
  const name = await tokenContract.name().then((name) => {
    return name;
  });

  response.render("token", {
    name: name,
    address: tokenContract.address,
  });
});

router.post("/token", async (request, response) => {
  const recipientAddress = request.body.recipientAddress;
  const amount = request.body["amount"];

  await tokenContract.transfer(recipientAddress, amount).then(console.log);

  response.render("token", {
    address: tokenContract.address,
  });
});

export = router;
