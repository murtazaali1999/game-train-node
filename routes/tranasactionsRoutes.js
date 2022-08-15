const express = require("express");

const router = express.Router();

//importing all controllers
const transactionController = require("../controllers/transactionController");

//importing all middleware
const transactionMiddleware = require("../middlewares/transactionsMiddleware");

router.post(
  "/initialize-challenge",
  transactionMiddleware.initChallengeMiddleware,
  transactionController.initializeChallenge
);
router.post(
  "/create-challenge",
  transactionMiddleware.initChallengeMiddleware,
  transactionController.createNewChallenge
);

router.post(
  "/enter-first-challenge",
  transactionMiddleware.enterChallengeMiddleware,
  transactionController.enterFirstChallenge
);
router.post(
  "/enter-challenge",
  transactionMiddleware.enterChallengeMiddleware,
  transactionController.enterChallenge
);

router.post(
  "/withdraw-prize-money",
  transactionMiddleware.withdrawPrizeAndPrintPDAMiddleware,
  transactionController.withdrawPrizeMoney
);
router.post(
  "/print-pda",
  transactionMiddleware.withdrawPrizeAndPrintPDAMiddleware,
  transactionController.printPDA
);

router.post(
  "/initialize-player",
  transactionMiddleware.initializePlayerMiddleware,
  transactionController.initializePlayer
);
router.post(
  "/award-points-to-winner",
  transactionMiddleware.awardPointsToWinnerMiddleware,
  transactionController.awardPointsToWinner
);
router.post(
  "/get-player",
  transactionMiddleware.getPlayerMiddleware,
  transactionController.getPlayer
);

router.post("/get-winner", transactionController.getWinner);
router.post("/end-challenge", transactionController.endChallenge);
router.post(
  "/withdraw-platform-money",
  transactionController.withdrawPlatformMoney
);

//add middleware here,for validations etc

module.exports = router;
