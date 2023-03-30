const Validator = require('../Validator');
class AbstractCurrencyValidator extends Validator{
    validateAddress(address){
        throw new Error("validateAddress not implemented");
    }
}

module.exports = AbstractCurrencyValidator;