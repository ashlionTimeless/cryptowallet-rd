
const BtcValidator = require("./BtcValidator");
class LtcValidator extends BtcValidator{
    validateAddress(address){
        this.validateString(address,"LTC Address");
        super.validateAddress(address);
    };
}

module.exports = LtcValidator;