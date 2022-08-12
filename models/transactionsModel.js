const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      enum: {
        values: [
          "InitializeChallenge",
          "CreateNewChallenge",
          "InitializePlayer",
          "WithdrawPlatformMoney",
          "EndChallenge",
          "AwardPointsToWinner",
          "EnterChallenge",
          "WithdrawPrizeMoney",
        ],
      },
      default: "None",
    },
    userType: {
      enum: { values: ["Admin", "User"] },
    },
    signers: [{ type: String, default: null }],
    hash:{type:String}
  },
  { timestamps: true } //to keep track of when were changes made to transactions
);

const Transaction =
  global.Transaction || mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
