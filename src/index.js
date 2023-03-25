const CURRENCY = "ETH";
const ERC20 = "ERC20";

const WalletUi = require('./core/ui/WalletUi');
const BlockchainService = require('./core/blockchain/BlockchainService');

class Application{

    constructor() {
        this.walletUi = new WalletUi(this);
        this.blockchain = new BlockchainService();
    }

    prepareInterface(){
        this.walletUi.prepareInterface();
    }
    changeCurrency(){

    }

    getBalance(){
        return new Promise(async(resolve,reject)=>{
            try{
                let balance =await this.blockchain.getBalance();
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }

    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try{
                let balance =await this.blockchain.getAddress();
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }
    getCurrency(){
        return CURRENCY;
    }

    sendCurrency(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                let result =await this.blockchain.sendCurrency(to,amount);
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }


}

let app = new Application();
app.prepareInterface();