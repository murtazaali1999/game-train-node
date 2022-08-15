require("dotenv").config();

const {
  Program,
  Provider,
  web3,
  utils,
  Wallet,
} = require("@project-serum/anchor");
const { Connection, Keypair, PublicKey } = require("@solana/web3.js");
const IDL = require("../imports/idl.json");
const bs58 = require("bs58");

const { useAnchorWallet } = require("@solana/wallet-adapter-react");

const keyPairAdmin = process.env.ADMIN_KEY_PAIR; //secretkey

module.exports = {
  getProvider: async () => {
    const network = "https://metaplex.devnet.rpcpool.com";
    const connection = new Connection(network, "confirmed");

    const key58 = bs58.decode(keyPairAdmin);

    const keypair = Keypair.fromSecretKey(key58);

    const wallet = new Wallet(keypair);

    const airDropSig = await connection
      .requestAirdrop(keypair.publicKey, 2000000000)
      .catch((err) => {
        console.log("There was an error airdropping", err.message);
      });

    await connection.confirmTransaction(airDropSig).catch((err) => {
      console.log("There was an error airdropping", err.message);
    });

    const provider = new Provider(connection, wallet, "confirmed");

    return { provider, wallet, keypair };
  },
};
