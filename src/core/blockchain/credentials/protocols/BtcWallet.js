const AbstractCurrencyWallet = require('/src/core/blockchain/credentials/protocols/AbstractCurrencyWallet');
const {payments,networks}= require('bitcoinjs-lib');
const NETWORK = networks.testnet;
const bip39 = require("bip39");
const bip32 = require("bip32");
class BtcWallet extends AbstractCurrencyWallet{
    provideAddress(mnemonic) {
        return new Promise(async(resolve,reject)=>{
            try {
                const seed = await bip39.mnemonicToSeed(mnemonic);
                const root = bip32.fromSeed(seed, NETWORK);
                const child = root.derivePath(`m/44'/1'/0'/0/0`);
                const { address } = payments.p2pkh({ pubkey: child.publicKey, network: NETWORK });
                return resolve(address);
            } catch (e) {
                return reject(e);
            }
        })
    }
    providePrivateKey(mnemonic) {
        return new Promise(async(resolve,reject)=>{
            try {
                const seed = await bip39.mnemonicToSeed(mnemonic);
                const root = bip32.fromSeed(seed, NETWORK);
                const child = root.derivePath(`m/44'/1'/0'/0/0`);
                const privateKey = child.toWIF();
                return resolve(privateKey);
            } catch (e) {
                return reject(e)
            }
        })
    }

}

module.exports = BtcWallet;