const BtcLib = require('/src/core/blockchain/btc/BtcLib');
const LtcBlockcypherProvider = require('/src/core/blockchain/ltc/LtcBlockcypherProvider');
const LtcValidator = require('/src/core/validators/blockchain/LtcValidator')
const LtcConverter = require('/src/core/helpers/LtcConverter');

const NETWORK = require('/src/core/blockchain/ltc/LtcNetworks')["main"];

class LtcLib extends BtcLib{
    constructor(app) {
        super(app);
        this.validator = new LtcValidator();
        this.converter = new LtcConverter();
        this.provider = new LtcBlockcypherProvider(app,this.validator,this.converter);
    }
    _getNetwork(){
        return NETWORK;
    }
}
module.exports = LtcLib;