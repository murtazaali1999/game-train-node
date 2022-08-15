//Imports
const mongoose = require("mongoose");
const bs58 = require("bs58");
const { Keypair, PublicKey } = require("@solana/web3.js");

require("dotenv").config();
require("../models/transactionsModel");

//Models
const Transaction = mongoose.model("Transaction");

//ENV
const BASE_URI = process.env.BASE_SOLANA_EX_URI;
const SOLANA_NETWORK = process.env.SOLANA_NETWORK;

//for BC transactions
const transaction = require("../library/index");

module.exports = {
  initializeChallenge: async (req, res, next) => {
    const { name, numberOfLevels } = req.body;

    if (!name || !numberOfLevels) {
      return res.status(300).json({ message: "One or more fields are empty" });
    }

    const hash = await transaction
      .initChallenge(name, numberOfLevels)
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });

    if (typeof hash != "string") {
      return res.status(500).json({ transaction: hash });
    }

    const newChallenge = new Transaction({
      transactionType: "InitializeChallenge",
      userType: "Admin",
      signers: ["Admin"],
      hash: BASE_URI + hash + SOLANA_NETWORK,
    });

    newChallenge
      .save()
      .then(() => {
        return res.status(200).json({
          message: "Challenge Initialized Successfully",
          status: true,
        });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ error: "There was error saving Challenge", status: false });
      });
  },

  createNewChallenge: async (req, res, next) => {
    const { name, numberOfLevels } = req.body;

    if (!name || !numberOfLevels) {
      return res.status(300).json({ message: "One or more fields are empty" });
    }

    //check their types too
    const hash = await transaction
      .createChallenge(name, numberOfLevels)
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });

    if (typeof hash != "string") {
      return res.status(500).json({ transaction: hash });
    }

    const challenge = new Transaction({
      transactionType: "CreateNewChallenge",
      userType: "Admin",
      signers: ["Admin"],
      hash: BASE_URI + hash + SOLANA_NETWORK,
    });

    challenge
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ message: "Challenge Created Successfully", status: true });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ error: "There was error saving Challenge" });
      });
  },

  initializePlayer: async (req, res, next) => {
    const { player, playerSigner } = req.body;

    if (!player || !playerSigner) {
      return res.status(300).json({ message: "One or more fields are empty" });
    }

    //convert keypair and wallet check
    const hash = await transaction.initPlayer(player, playerSigner);

    if (typeof hash != "string") {
      return res.status(500).json({ transaction: hash });
    }

    const newPlayer = new Transaction({
      transactionType: "InitializePlayer",
      userType: "User",
      signers: ["User", "Admin"], //maybe pass private key or just this
      hash: BASE_URI + hash + SOLANA_NETWORK,
    });

    newPlayer
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ message: "Player Successfully Initialized", status: true });
      })
      .catch((err) => {
        return res.status(500).json({
          error: "There was an error initializing player",
          status: false,
        });
      });
  },

  withdrawPlatformMoney: async (req, res, next) => {
    const hash = await transaction.withdrawPlatformMoney().catch((err) => {
      return res.status(500).json({ error: err.message });
    });

    if (typeof hash != "string") {
      return res.status(500).json({ transaction: hash });
    }

    const withdraw = new Transaction({
      transactionType: "WithdrawPlatformMoney",
      userType: "Admin",
      signers: ["Admin"], //maybe pass private key or just this
      hash: BASE_URI + hash + SOLANA_NETWORK,
    });

    withdraw
      .save()
      .then(() => {
        return res.status(200).json({
          message: "Withdrawn Platform Money Successfully",
          status: true,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: "There was an error Withdrawing Platform Money",
          status: false,
        });
      });
  },

  endChallenge: async (req, res, next) => {
    const hash = await transaction.endChallenge().catch((err) => {
      return res.status(500).json({ error: err.message });
    });

    if (typeof hash != "string") {
      return res.status(500).json({ transaction: hash });
    }

    const challenge = new Transaction({
      transactionType: "EndChallenge",
      userType: "Admin",
      signers: ["Admin"], //maybe pass private key or just this
      hash: BASE_URI + hash + SOLANA_NETWORK,
    });

    challenge
      .save()
      .then(() => {
        return res.status(200).json({
          message: "Challenge Ended Successfully",
          status: true,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: "There was an error ending the challenge",
          status: false,
        });
      });
  },

  awardPointsToWinner: async (req, res, next) => {
    const { player, signer } = req.body;

    if (!player || !signer) {
      return res.status(300).json({ message: "One or more fields are empty" });
    }

    const hash = await transaction
      .awardPointsToWinner(player, signer)
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });

    if (typeof hash != "string") {
      console.log("Error==>", hash);
      return res.status(500).json({ transaction: hash });
    }

    const pointsAward = new Transaction({
      transactionType: "AwardPointsToWinner",
      userType: "Admin",
      signers: ["Admin"],
      hash: BASE_URI + hash + SOLANA_NETWORK,
    });

    pointsAward
      .save()
      .then(() => {
        console.log("here");
        return res.status(200).json({ message: "Awards given successfully" });
      })
      .catch((err) => {
        return res.status(500).json({
          error: "There was an error rewarding points",
          status: false,
        });
      });
  },

  enterFirstChallenge: async (req, res, next) => {
    const { player, user } = req.body;

    if (!player || !user) {
      return res.status(300).json({ message: "One or more fields are empty" });
    }

    const hash = await transaction.enterFirstChallenge(player, user);

    if (typeof hash != "string") {
      return res.status(500).json({ transaction: hash });
    }

    const challenge = new Transaction({
      transactionType: "EnterFirstChallenge",
      userType: "User",
      signers: ["Admin", "User"],
      hash: BASE_URI + hash + SOLANA_NETWORK,
    });

    challenge
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ message: "Challenge Entered Successfully" });
      })
      .catch((err) => {
        return res
          .status(200)
          .json({ error: "There was an error entering challenge" });
      });
  },

  enterChallenge: async (req, res, next) => {
    const { player, user } = req.body;

    if (!player || !user) {
      return res.status(300).json({ message: "One or more fields are empty" });
    }

    const hash = await transaction.enterChallenge(player, user);

    if (typeof hash != "string") {
      return res.status(500).json({ transaction: hash });
    }

    const challenge = new Transaction({
      transactionType: "AwardPointsToWinner",
      userType: "User",
      signers: ["Admin", "User"],
      hash: BASE_URI + hash + SOLANA_NETWORK,
    });

    challenge
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ message: "Challenge Entered Successfully" });
      })
      .catch((err) => {
        return res
          .status(200)
          .json({ error: "There was an error entering challenge" });
      });
  },

  printPDA: async (req, res, next) => {
    const { challangeSigner } = req.body;

    if (!challangeSigner) {
      return res.status(300).json({ message: "One or more fields are empty" });
    }

    const hash = await transaction.printPDA(challangeSigner);

    if (typeof hash != "string") {
      return res.status(500).json({ transaction: hash });
    }

    const PDA = new Transaction({
      transactionType: "PrintPDA",
      userType: "User",
      signers: ["Admin", "User"],
      hash: BASE_URI + hash + SOLANA_NETWORK,
    });

    PDA.save()
      .then(() => {
        return res.status(200).json({ message: "PDA Printed Sucessfully" });
      })
      .catch((err) => {
        return res
          .status(200)
          .json({ error: "There was an error priniting PDA" });
      });
  },

  getWinner: async (req, res, next) => {
    const hash = await transaction.getWinner().catch((err) => {
      return res.status(500).json({ error: err.message });
    });

    if (typeof hash != "string") {
      return res.status(500).json({ transaction: hash });
    }

    const winner = new Transaction({
      transactionType: "getWinner",
      userType: "Admin",
      signers: ["Admin"],
      hash: BASE_URI + hash + SOLANA_NETWORK,
    });

    winner
      .save()
      .then(() => {
        return res.status(200).json({ message: "Fetched Winner Successfully" });
      })
      .catch((err) => {
        return res
          .status(200)
          .json({ error: "There was an error fetching the Winner" });
      });
  },

  withdrawPrizeMoney: async (req, res, next) => {
    const { challangeSigner } = req.body;
    console.log(challangeSigner);

    if (!challangeSigner || challangeSigner == null) {
      return res.status(300).json({ message: "One or more fields are empty" });
    }

    console.log("How ??");

    const hash = await transaction
      .withdrawPrizeMoney(challangeSigner)
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });

    if (typeof hash != "string") {
      return res.status(500).json({ transaction: hash });
    }

    const withdrawPrize = new Transaction({
      transactionType: "WithdrawPrizeMoney",
      userType: "Admin",
      signers: ["Admin"],
      hash: BASE_URI + hash + SOLANA_NETWORK,
    });

    withdrawPrize
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ message: "Money Withdrawn Successfully" });
      })
      .catch((err) => {
        return res
          .status(200)
          .json({ error: "There was an error withdrawing prize" });
      });
  },

  getPlayer: async (req, res, next) => {
    const { player } = req.body;

    if (!player || player == null) {
      return res.status(300).json({ message: "One or more fields are empty" });
    }

    const hash = await transaction.getPlayer(player).catch((err) => {
      return res.status(500).json({ error: err.message });
    });

    if (typeof hash != "string") {
      return res.status(500).json({ transaction: hash });
    }

    const getPlayer = new Transaction({
      transactionType: "getPlayer",
      userType: "User",
      signers: ["User"],
      hash: BASE_URI + hash + SOLANA_NETWORK,
    });

    getPlayer
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ message: "Money Withdrawn Successfully" });
      })
      .catch((err) => {
        return res
          .status(200)
          .json({ error: "There was an error withdrawing prize" });
      });
  },
};
