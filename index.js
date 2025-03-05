"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tweetnacl_1 = __importDefault(require("tweetnacl"));
const ed25519_hd_key_1 = require("ed25519-hd-key");
const web3_js_1 = require("@solana/web3.js");
const bip39_1 = require("bip39");
const mnemonic = (0, bip39_1.generateMnemonic)(); //by default 128(12 words) can use 256(24 words).
console.log("Generated Mnemonic:", mnemonic);
const seed = (0, bip39_1.mnemonicToSeedSync)(mnemonic);
//console.log(seed);
const path = "m/44'/501'/0'/0'"; //derivation path [sol-501']
const derivedSeed = (0, ed25519_hd_key_1.derivePath)(path, seed.toString("hex")).key;
const secret = tweetnacl_1.default.sign.keyPair.fromSeed(derivedSeed).secretKey;
// console.log("Private Key :", bs58.encode(secret)); //prints private key
console.log("Public Key : ", web3_js_1.Keypair.fromSecretKey(secret).publicKey.toBase58());
