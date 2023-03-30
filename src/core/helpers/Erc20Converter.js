const Converter = require('./Converter');
const DECIMALS=18;
class Erc20Converter extends Converter{
    toDecimals(amount) {
        return super.toDecimals(amount, DECIMALS);
    }

    fromDecimals(amount) {
        return super.fromDecimals(amount, DECIMALS);
    }
}

module.exports = Erc20Converter;