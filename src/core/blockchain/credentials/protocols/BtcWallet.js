const AbstractCurrencyWallet = require('/src/core/blockchain/credentials/protocols/AbstractCurrencyWallet');
const {payments,networks}= require('bitcoinjs-lib');
const bip39 = require("bip39");
const bip32 = require("bip32");
const isProduction = require('/src/isProduction');
class BtcWallet extends AbstractCurrencyWallet{

    _getDirevationPath(){
        return isProduction?`m/44'/0'/0'/0/0`:`m/44'/1'/0'/0/0`;
    }
    _getNetwork(){
        return isProduction?networks.bitcoin:networks.testnet;
    }
    provideAddress(mnemonic) {
        return new Promise(async(resolve,reject)=>{
            try {
                const seed = await bip39.mnemonicToSeed(mnemonic);
                const root = bip32.fromSeed(seed, this._getNetwork());
                const child = root.derivePath(this._getDirevationPath());
                const { address } = payments.p2pkh({ pubkey: child.publicKey, network: this._getNetwork() });
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
                const root = bip32.fromSeed(seed, this._getNetwork());
                const child = root.derivePath(this._getDirevationPath());
                const privateKey = child.toWIF();
                return resolve(privateKey);
            } catch (e) {
                return reject(e)
            }
        })
    }

}

module.exports = BtcWallet;