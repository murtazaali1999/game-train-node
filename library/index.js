//Imports
const {
  Program,
  Provider,
  web3,
  utils,
  BN,
  Wallet,
} = require("@project-serum/anchor");
const {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
} = require("@solana/web3.js");
const buffer = require("buffer");
const myprovider = require("./provider");

//IDL
const IDL = require("../imports/idl.json");
const { bytes } = require("@project-serum/anchor/dist/cjs/utils");
//Keypair
const keyPair = process.env.ADMIN_KEY_PAIR;

module.exports = {
  createChallenge: async (name, numberOfLevels) => {
    const programID = new PublicKey(IDL.metadata.address);

    const { provider, wallet, keypair } = await myprovider.getProvider();

    const program = new Program(IDL, programID, provider);

    const [challengePubKey, challengeBump] =
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from(utils.bytes.utf8.encode("NEW_CHALLENGE")),
          wallet.publicKey.toBytes(),
        ],
        programID
      );

    const numberLevels = new BN(numberOfLevels);
    const tx = await program.rpc
      .createChallenge(name, numberLevels, {
        accounts: {
          challenge: challengePubKey,
          challangeSigner: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
      })
      .catch((err) => {
        return err;
      });

    return tx;
  },

  endChallenge: async () => {
    const programID = new PublicKey(IDL.metadata.address);

    const { provider, wallet, keypair } = await myprovider.getProvider();

    const program = new Program(IDL, programID, provider);

    const [challengePubKey, challengeBump] =
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from(utils.bytes.utf8.encode("NEW_CHALLENGE")),
          wallet.publicKey.toBytes(),
        ],
        programID
      );

    const tx = await program.rpc
      .endChallenge({
        accounts: {
          challenge: challengePubKey,
          signer: wallet.publicKey,
        },
      })
      .catch((err) => {
        return err;
      });

    return tx;
  },

  initChallenge: async (name, numberOfLevels) => {
    const programID = new PublicKey(IDL.metadata.address);

    const { provider, wallet, keypair } = await myprovider.getProvider();

    const program = new Program(IDL, programID, provider);

    const [challengePubKey, challengeBump] =
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from(utils.bytes.utf8.encode("NEW_CHALLENGE")),
          wallet.publicKey.toBytes(),
        ],
        programID
      );

    const Levels = new BN(numberOfLevels);
    const tx = await program.rpc
      .initializeChallenge(name, Levels, {
        accounts: {
          challenge: challengePubKey,
          challangeSigner: wallet.publicKey,
        },
      })
      .catch((err) => {
        return err;
      });

    return tx;
  },

  initPlayer: async (player, playerSigner) => {
    const programID = new PublicKey(IDL.metadata.address);

    const { provider, wallet, keypair } = await myprovider.getProvider();

    const program = new Program(IDL, programID, provider);

    const [challengePubKey, challengeBump] =
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from(utils.bytes.utf8.encode("NEW_CHALLENGE")),
          wallet.publicKey.toBytes(),
        ],
        programID
      ); //for now challenge is kept,remove this challenge
    //not required here

    const [playerPubKey, playereBump] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(utils.bytes.utf8.encode("NEW_PLAYER")),
        bytes.bs58.decode(player),
      ],
      programID
    );

    const tx = await program.rpc
      .initializePlayer({
        accounts: {
          player: playerPubKey, //player+seed
          playerSigner, //simple pubkey
          challenge: challengePubKey, //for now only,remove this, change account
        },
      })
      .catch((err) => {
        return err;
      });

    return tx;
  },

  withdrawPlatformMoney: async () => {
    const programID = new PublicKey(IDL.metadata.address);

    const { provider, wallet, keypair } = await myprovider.getProvider();

    const program = new Program(IDL, programID, provider);

    const [challengePubKey, challengeBump] =
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from(utils.bytes.utf8.encode("NEW_CHALLENGE")),
          wallet.publicKey.toBytes(),
        ],
        programID
      );

    const tx = await program.rpc
      .platformWithdraw({
        accounts: {
          challangeSigner: wallet.publicKey,
          challenge: challengePubKey,
        },
      })
      .catch((err) => {
        return err;
      });

    return tx;
  },

  awardPointsToWinner: async (player, signer) => {
    const programID = new PublicKey(IDL.metadata.address);

    const { provider, wallet, keypair } = await myprovider.getProvider();

    const program = new Program(IDL, programID, provider);

    const [challengePubKey, challengeBump] =
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from(utils.bytes.utf8.encode("NEW_CHALLENGE")),
          wallet.publicKey.toBytes(),
        ],
        programID
      );

    const [playerPubKey, playereBump] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(utils.bytes.utf8.encode("NEW_PLAYER")),
        bytes.bs58.decode(player),
      ],
      programID
    );

    const tx = await program.rpc
      .awardPoints({
        accounts: {
          player: playerPubKey,
          signer,
          challenge: challengePubKey,
        },
      })
      .catch((err) => {
        return err;
      });

    return tx;
  },

  enterChallenge: async (player, user) => {
    const programID = new PublicKey(IDL.metadata.address);

    const { provider, wallet, keypair } = await myprovider.getProvider();

    const program = new Program(IDL, programID, provider);

    const [challengePubKey, challengeBump] =
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from(utils.bytes.utf8.encode("NEW_CHALLENGE")),
          wallet.publicKey.toBytes(),
        ],
        programID
      );

    const [playerPubKey, playereBump] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(utils.bytes.utf8.encode("NEW_PLAYER")),
        wallet.publicKey.toBytes(),
      ],
      programID
    );

    const tx = await program.rpc
      .enterChallenge({
        accounts: {
          player,
          user, //signer
          challenge: challengePubKey,
          systemProgram: SystemProgram.programId,
        },
      })
      .catch((err) => {
        return err;
      });

    return tx;
  },

  withdrawPrizeMoney: async (challangeSigner) => {
    const programID = new PublicKey(IDL.metadata.address);

    const { provider, wallet, keypair } = await myprovider.getProvider();

    const program = new Program(IDL, programID, provider);

    const [challengePubKey, challengeBump] =
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from(utils.bytes.utf8.encode("NEW_CHALLENGE")),
          wallet.publicKey.toBytes(),
        ],
        programID
      );

    const tx = await program.rpc
      .winnerWithdraw({
        accounts: {
          challenge: challengePubKey,
          challangeSigner,
        },
      })
      .catch((err) => {
        return err;
      });

    return tx;
  },

  enterFirstChallenge: async (player, user) => {
    const programID = new PublicKey(IDL.metadata.address);

    const { provider, wallet, keypair } = await myprovider.getProvider();

    const program = new Program(IDL, programID, provider);

    const [challengePubKey, challengeBump] =
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from(utils.bytes.utf8.encode("NEW_CHALLENGE")),
          wallet.publicKey.toBytes(),
        ],
        programID
      );

    const [playerPubKey, playereBump] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(utils.bytes.utf8.encode("NEW_PLAYER")),
        wallet.publicKey.toBytes(),
      ],
      programID
    );

    const tx = await program.rpc
      .enterFirstchallenge({
        accounts: {
          player,
          user, //signer
          challenge: challengePubKey,
          systemProgram: SystemProgram.programId,
        },
      })
      .catch((err) => {
        return err;
      });

    return tx;
  },

  printPDA: async (challangeSigner) => {
    const programID = new PublicKey(IDL.metadata.address);

    const { provider, wallet, keypair } = await myprovider.getProvider();

    const program = new Program(IDL, programID, provider);

    const tx = await program.rpc
      .printPda({
        accounts: {
          challangeSigner,
          systemProgram: SystemProgram.programId,
        },
      })
      .catch((err) => {
        return err;
      });

    return tx;
  },

  getWinner: async () => {
    const programID = new PublicKey(IDL.metadata.address);

    const { provider, wallet, keypair } = await myprovider.getProvider();

    const program = new Program(IDL, programID, provider);

    const [challengePubKey, challengeBump] =
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from(utils.bytes.utf8.encode("NEW_CHALLENGE")),
          wallet.publicKey.toBytes(),
        ],
        programID
      );

    const tx = await program.rpc
      .getWinner({
        accounts: {
          challenge: challengePubKey,
        },
      })
      .catch((err) => {
        return err;
      });

    return tx;
  },

  getPlayer: async (player) => {
    const programID = new PublicKey(IDL.metadata.address);

    const { provider, wallet, keypair } = await myprovider.getProvider();

    const program = new Program(IDL, programID, provider);

    const [playerPubKey, playereBump] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from(utils.bytes.utf8.encode("NEW_PLAYER")),
        bytes.bs58.decode(player),
      ],
      programID
    );

    const tx = await program.rpc
      .getPlayer({
        accounts: {
          player: playerPubKey,
        },
      })
      .catch((err) => {
        return err;
      });

    return tx;
  },
};
