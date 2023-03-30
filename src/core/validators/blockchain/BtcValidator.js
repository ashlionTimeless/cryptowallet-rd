const WalletAddressValidator = require('wallet-address-validator');
const BTC = "BTC";
const AbstractCurrencyValidator = require("./AbstractCurrencyValidator");
class BtcValidator extends AbstractCurrencyValidator{
    validateAddress(address){
        this.validateString(address,"BTC Address");
        WalletAddressValidator.validate(address,BTC);
    };
}

module.exports = BtcValidator;