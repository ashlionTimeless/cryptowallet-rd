

const EthLib = require('./eth/EthLib');
const Erc20Lib = require('./erc20/Erc20Lib');
class BlockchainService{
    constructor(app) {
        this.app = app;
        let eth = new EthLib();
        let erc20 = new Erc20Lib();
        this.libraries={
            "ETH":eth,
            "ERC20":erc20
        };
        console.log("libraries",this.libraries);
    }

    getCurrentLibrary(){
        console.log("getCurrentLibrary",this.app.getCurrency(),this.libraries[this.app.getCurrency()])
        return this.libraries[this.app.getCurrency()];
    }

    getCurrentBalance(){
        return new Promise(async(resolve,reject)=>{
            try{
                let balance =await this.getCurrentLibrary().getCurrentBalance();
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }

    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try{
                let balance =await this.getCurrentLibrary().getAddress();
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }

    sendCurrency(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                let result =await this.getCurrentLibrary().sendCurrency(to,amount);
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }
}

module.exports = BlockchainService;