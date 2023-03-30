const AbstractCurrencyLab = require('/src/core/blockchain/AbstractCurrencyLib')
const BTC_ADDRESS = process.env.BTC_ADDRESS;
console.log(process.env);
console.log(process.env.BTC_ADDRESS);

const BTC_WIF = process.env.BTC_WIF;

const BtcValidator = require('/src/core/validators/blockchain/BtcValidator');
const BtcConverter = require('/src/core/helpers/BtcConverter');
const BlockcypherProvider = require('/src/core/blockchain/btc/BlockcypherProvider');


class BtcLib extends AbstractCurrencyLab{

    constructor() {
        let provider = new BlockcypherProvider();
        let validator = new BtcValidator();
        let converter = new BtcConverter();
        super(provider,validator,converter);
    }

    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try{
                console.log("btcLib getAddress",BTC_ADDRESS);
                return resolve(BTC_ADDRESS);
            }catch(e){
                return reject(e);
            }
        })
    };

    getBalance(address){
        return new Promise(async(resolve,reject)=>{
            try{
                this.validator.validateAddress(address);
                let balance = await this.provider.getBalance(address);
                balance = this.converter.toDecimals(balance);
                console.log("getBalance balance toDecimals = ",balance);
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }
}

module.exports = BtcLib;