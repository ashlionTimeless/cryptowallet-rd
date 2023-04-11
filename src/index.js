const CURRENCY = "ETH";
const ERC20 = "ERC20";

const WalletUi = require('./core/ui/WalletUi');
const BlockchainService = require('./core/blockchain/BlockchainService');
const HttpService = require('/src/core/services/HttpService');
const isProduction = require("./isProduction");
class Application{

    constructor() {
        this.setCurrency(CURRENCY);
        this.httpService = new HttpService(this);
        this.walletUi = new WalletUi(this);
        this.blockchain = new BlockchainService(this);
    }

    changeCurrency(currency){
        this.setCurrency(currency);
        this.prepareInterface();
    }
    prepareInterface(){
        this.walletUi.prepareInterface();
    }

    getCurrentBalance(){
        return new Promise(async(resolve,reject)=>{
            try{
                let balance =await this.blockchain.getCurrentBalance();
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

    setCurrency(currency){
        this.currency=currency;
    }
    getCurrency(){
        return this.currency;
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

    generateMnemonic(){
        return new Promise(async(resolve,reject)=>{
            try{
                let result =await this.blockchain.generateMnemonic();
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }

    importMnemonic(mnemonic){
        return new Promise(async(resolve,reject)=>{
            try{
                let result =await this.blockchain.importMnemonic(mnemonic);
                app.prepareInterface();
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }

    isProduction(){
        return isProduction;
    }

}

let app = new Application();
alert("Please insert mnemonic");
