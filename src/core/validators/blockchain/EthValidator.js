const ethereum_address = require('ethereum-address');
const AbstractCurrencyValidator = require('./AbstractCurrencyValidator');
class EthValidator extends AbstractCurrencyValidator{
    validateAddress(address){
        if(!ethereum_address.isAddress(address)){
            throw new Error('Invalid Ethereum Address');
        }
    };
}

module.exports = EthValidator;