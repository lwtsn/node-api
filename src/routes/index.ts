import { Router } from "express";
import { getTokenContract } from "../service/web3";

const router = Router();

/* GET home page. */
router.get("/", function(request, response, next) {
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
    is_paused: await tokenContract.paused()
  });
});

router.post("/transfer", async (request, response) => {
  let tokenContract = await getTokenContract();

  const recipientAddress = request.body["recipientAddress"];
  const amount = request.body["amount"];

  try {
    await tokenContract.transfer(recipientAddress, amount);
  } catch (result) {
    response.json({
      address: tokenContract.address,
      amount: amount,
      success: false,
      error: result.error.body
    });
    return;
  }

  const recipientBalance = await tokenContract.balanceOf(recipientAddress);

  response.json({
    address: tokenContract.address,
    amount: amount,
    recipient_amount: recipientBalance.toString(),
    success: true
  });
});

router.post("/pause", async (request, response) => {
  let tokenContract = await getTokenContract();

  await tokenContract.pause();

  response.json({
    address: tokenContract.address,
    success: true,
    is_paused: await tokenContract.paused()
  });
});

router.post("/unpause", async (request, response) => {
  let tokenContract = await getTokenContract();

  await tokenContract.unpause();

  response.json({
    address: tokenContract.address,
    success: true,
    is_paused: await tokenContract.paused()
  });
});

export = router;
