const Web3 = require('web3');
const EthLib = require('/src/core/blockchain/eth/EthLib');
const BnbValidator = require('/src/core/validators/blockchain/BnbValidator')
const BnbConverter = require('/src/core/helpers/BnbConverter');
let PROVIDER_URL = process.env.BNB_PROVIDER_URL;
class BnbLib extends EthLib{
    constructor(app) {
        super(app);
        this.validator = new BnbValidator();
        this.converter = new BnbConverter();
        this.provider = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
    }

    _getChainId(){
        return this.app.isProduction()?56:97;
    }
}
module.exports = BnbLib;