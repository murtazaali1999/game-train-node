const express = require("express");

const router = express.Router();

//importing all controllers
const transactionController = require("../controllers/transactionController");

//importing all middleware
const transactionMiddleware = require("../middlewares/transactionsMiddleware");


router.post("/initialize-challenge",transactionController.initializeChallenge);
router.post("/create-challenge",transactionController.createNewChallenge);
router.post("/initialize-player",transactionController.initializePlayer);
router.post("/withdraw-platform-money",transactionController.withdrawPlatformMoney);
router.post("/end-challenge",transactionController.endChallenge);
router.post("/award-points-to-winner",transactionController.awardPointsToWinner);
router.post("/withdraw-prize-money",transactionController.withdrawPrizeMoney);

//add middleware here,for validations etc

module.exports = router;
