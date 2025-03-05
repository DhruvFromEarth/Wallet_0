import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import bs58 from "bs58";

const mnemonic = generateMnemonic(); //by default 128(12 words) can use 256(24 words).
console.log("Generated Mnemonic:", mnemonic);
const seed = mnemonicToSeedSync(mnemonic);
//console.log(seed);

const path = "m/44'/501'/0'/0'"; //derivation path [sol-501']
const derivedSeed = derivePath(path, seed.toString("hex")).key;
const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
// console.log("Private Key :", bs58.encode(secret)); //prints private key
console.log("Public Key : ",Keypair.fromSecretKey(secret).publicKey.toBase58());