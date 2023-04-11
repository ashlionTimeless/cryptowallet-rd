const EthLib = require('./eth/EthLib');
const Erc20Lib = require('./erc20/Erc20Lib');
const BtcLib = require('./btc/BtcLib');
const LtcLib = require('./ltc/LtcLib');
const BnbLib = require('./bnb/BnbLib');
const CredentialService = require('/src/core/blockchain/credentials/CredentialService');
class BlockchainService{
    constructor(app) {
        this.app = app;
        this.credentials = new CredentialService(app);
        let eth = new EthLib(app);
        let erc20 = new Erc20Lib(app);
        let btc = new BtcLib(app);
        let ltc = new LtcLib(app);
        let bnb = new BnbLib(app);
        this.libraries={
            "ETH":eth,
            "ERC20":erc20,
            "BTC":btc,
            "LTC":ltc,
            "BNB":bnb
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

    generateMnemonic(){
        return new Promise(async(resolve,reject)=>{
            try{
                let result =await this.credentials.generateMnemonic();
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }

    importMnemonic(mnemonic){
        return new Promise(async(resolve,reject)=>{
            try{
                let result =await this.credentials.importMnemonic(mnemonic);

                // TODO Update credentials
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }
}

module.exports = BlockchainService;