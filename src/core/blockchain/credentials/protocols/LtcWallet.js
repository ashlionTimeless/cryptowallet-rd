const BtcWallet = require("/src/core/blockchain/credentials/protocols/BtcWallet");
const NETWORK = require('/src/core/blockchain/ltc/LtcNetworks')["main"];
class LtcWallet extends BtcWallet{

    _getDirevationPath(){
        return `m/44'/2'/0'/0/0`;
    }
    _getNetwork(){
        return NETWORK;
    }
}

module.exports = LtcWallet;