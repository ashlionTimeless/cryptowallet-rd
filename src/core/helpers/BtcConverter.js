const Converter = require('./Converter');
const DECIMALS=8;
class BtcConverter extends Converter{
    toDecimals(amount) {
        return super.toDecimals(amount, DECIMALS);
    }

    fromDecimals(amount) {
        return super.fromDecimals(amount, DECIMALS);
    }
}

module.exports = BtcConverter;