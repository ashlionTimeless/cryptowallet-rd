let address = "0x379299030b39fB95f4e6b8B80eD6cDf6fD08451F";
let privateKey = "8dc9427a8792e4e43375a5056150d2f30061b1cc7007a7a62e12bffeac1fe9f1";

let GWEI = 10**9;
let GAS_PRICE = 70*GWEI;

let GAS_LIMIT = 21000;
const Transaction = require('ethereumjs-tx');

let PROVIDER_URL = "https://sepolia.infura.io/v3/d607a74fa6d047b494769f10b6d451d6";

const Web3 = require('web3');

class EthLib{
    constructor() {
        this.web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
     }

    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(address);
            }catch (e){
                return reject(e);
            }
        })
    }

    getPrivateKey(){
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(privateKey);
            }catch (e){
                return reject(e);
            }
        })
    }

    getBalance(){
        return new Promise(async(resolve,reject)=>{
            try{
                let address = await this.getAddress();
                let balance =await this.web3.eth.getBalance(address);
                balance = this.web3.utils.fromWei(balance);
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }

    sendCurrency(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                let txData = await this._formatTransactionParams(to,amount);
                let hash = await this._makeTransaction(txData);
                return resolve(hash);
            }catch (e){
                return reject(e);
            }
        });
    }

    _formatTransactionParams(to,value,data=""){
        return new Promise(async(resolve,reject)=>{
            try{
                let privateKey = await this.getPrivateKey();
                let privKeyBuffer=Buffer.from(privateKey,'hex');
                let from = await this.getAddress();
                let nonce = await this.getNextNonce();

                let gasPrice = this.getGasPrice();
                let gasLimit = this.getGasLimit();
                console.log("_formatTransactionParams start value",value);
                value = this.fromDecimals(value);
                console.log("_formatTransactionParams end value",value);
                let txParams = {
                    "from":from,
                    "to":to,
                    "privateKey":privKeyBuffer,
                    "value":this.web3.utils.numberToHex(value),
                    "gasPrice":this.web3.utils.numberToHex(gasPrice),
                    "gasLimit":gasLimit,
                    "nonce":nonce,
                    "data":data,
                };
                return resolve(txParams);
            }catch (e){
                return reject(e);
            }
        })
    }
    toDecimals(amount){
        return this.web3.utils.fromWei(amount);
    }

    fromDecimals(amount){
        return this.web3.utils.toWei(amount);
    }

    getGasPrice(){
        return GAS_PRICE;
    }

    getGasLimit(){
        return GAS_LIMIT;
    }
    getNextNonce(){
        return new Promise(async(resolve,reject)=>{
            try{
                let address = await this.getAddress();
                let nonce =await this.web3.eth.getTransactionCount(address);
                return resolve(nonce);
            }catch (e){
                return reject(e)
            }
        });
    }
    _makeTransaction(txParams){
        return new Promise(async (resolve,reject)=>{
            try{
                let tx = new Transaction(txParams);
                console.log(tx);
                tx.sign(txParams.privateKey);
                var raw = "0x"+tx.serialize().toString('hex');

                this.web3.eth.sendSignedTransaction(raw).on("receipt",(data)=>{
                    console.log(data);
                    let transactionHash = data["transactionHash"];
                    return resolve(transactionHash);
                }).on("error",(e)=>{
                    console.error(e);
                    return reject(e);
                });

            }catch(e){
                return reject(e);
            }
        });
    }


}
module.exports = EthLib;