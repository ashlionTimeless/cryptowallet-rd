

const EthLib = require('./eth/EthLib');
class BlockchainService{
    constructor() {
        this.eth = new EthLib();
    }

    getBalance(){
        return new Promise(async(resolve,reject)=>{
            try{
                let balance =await this.eth.getBalance();
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }

    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try{
                let balance =await this.eth.getAddress();
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }

    sendCurrency(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                let result =await this.eth.sendCurrency(to,amount);
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }
}

module.exports = BlockchainService;