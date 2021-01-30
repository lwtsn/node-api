import { Router } from "express";
import { getTokenContract } from "../service/web3";

const router = Router();

/* GET home page. */
router.get("/", function (request, response, next) {
  response.render("index", { title: "Centralex" });
});

router.get("/token", async (req, response) => {
  let tokenContract = await getTokenContract();

  const name = await tokenContract.name().then((name) => {
    return name;
  });

  const decimals = await tokenContract.decimals().then((decimals) => {
    return decimals;
  });

  response.json({
    name: name,
    decimals: decimals,
    address: tokenContract.address,
  });
});

router.post("/token", async (request, response) => {
  let tokenContract = await getTokenContract();

  const recipientAddress = request.body["recipientAddress"];
  const amount = request.body["amount"];

  await tokenContract.transfer(recipientAddress, amount).then(console.log);

  response.json({
    address: tokenContract.address,
  });
});

export = router;
