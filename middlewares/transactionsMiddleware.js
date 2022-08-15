const joi = require("joi");


module.exports = {

  initChallengeMiddleware:async (req,res,next) => {
    const result = initChallengeSchema.
    validateAsync(req.body)
    .catch((err)=>{
      res.status(300).json({message:"There was an error validation"});
    });
  
  },

  enterChallengeMiddleware: async (req,res,next) => {
    const result = enterChallengeSchema.
    validateAsync(req.body)
    .catch((err)=>{
      res.status(300).json({message:"There was an error validation"});
    });
  },

  withdrawPrizeAndPrintPDAMiddleware: async (req,res,next) => {
    const result = withdrawPrizeAndPrintPdaSchema.
    validateAsync(req.body)
    .catch((err)=>{
      res.status(300).json({message:"There was an error validation"});
    });
  },

  initializePlayerMiddleware: async (req,res,next) => {
    const result = initializePlayerScehma.
    validateAsync(req.body)
    .catch((err)=>{
      res.status(300).json({message:"There was an error validation"});
    });
  },

  awardPointsToWinnerMiddleware: async (req,res,next) => {
    const result = awardPointsToWinnerSchema.
    validateAsync(req.body)
    .catch((err)=>{
      res.status(300).json({message:"There was an error validation"});
    });
  },

 
  getPlayerMiddleware: async (req,res,next) =>{
    const result = getPlayerSchema.
    validateAsync(req.body)
    .catch((err)=>{
      res.status(300).json({message:"There was an error validation"});
    });
  },

};

const getPlayerSchema = joi.object({
  player:joi.string().alphanum().required().length(44),
})

const awardPointsToWinnerSchema = joi.object({
  player:joi.string().alphanum().required().length(44),
  signer:joi.string().alphanum().required().length(44),
})

const initializePlayerScehma = joi.object({
  player:joi.string().alphanum().required().length(44),
  playerSigner:joi.string().alphanum().required().length(44)
})

const withdrawPrizeAndPrintPdaSchema = joi.object({
  challangeSigner: joi.string().alphanum().required().length(44),
})

const enterChallengeSchema = joi.object({
  player: joi.string().alphanum().required().length(44),
  user: joi.string().alphanum().required().length(44),
})

const initChallengeSchema = joi.object({
  name: joi.string().required(),
  numberOfLevels: joi.number().required().integer().positive()
})