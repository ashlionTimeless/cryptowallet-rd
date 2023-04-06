const EthLib = require('/src/core/blockchain/eth/EthLib');
const Converter = require('/src/core/helpers/Erc20Converter');

const ERC20_ABI = require("./erc20_abi");

const GAS_LIMIT = 300000;
const DECIMALS = 18;

const contractAddress =process.env.ERC20_CONTRACT_ADDRESS;

class Erc20Lib extends EthLib{

    constructor(app) {
        super(app);
        this.setContract();
        this.converter = new Converter()
    }
    composeContract(){
        let contract =new this.provider.eth.Contract(ERC20_ABI,this.getContractAddress());
        return contract;
    }

    setContract(){
        this.contract = this.composeContract();
    }
    getContractAddress(){
        return contractAddress;
    }
    getContract(){
        return this.contract;
    }

    getCurrentBalance(){
        return new Promise(async(resolve,reject)=>{
            try{
                let address = await this.getAddress();

                let balance = await this.getBalance(address)
                return resolve(balance);
            }catch (e) {
                return reject(e);
            }
        });
    }
    getBalance(address){
        return new Promise(async(resolve,reject)=>{
            try{
                this.validator.validateAddress(address);
                let balance = await this.getContract().methods.balanceOf(address).call();
                balance = this.toDecimals(balance);
                return resolve(balance);
            }catch (e) {
                return reject(e);
            }
        });
    }

    getGasLimit(){
        return GAS_LIMIT;
    }
    sendCurrency(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                amount = this.fromDecimals(amount);
                let data = this.getContract().methods.transfer(to, amount).encodeABI();
                console.log("sendCurrency data",data);
                let txData = await this._formatTransactionParams(this.getContractAddress(),"0",data);
                let hash = await this._makeTransaction(txData);
                return resolve(hash);
            }catch (e){
                return reject(e);
            }
        });
    }

    toDecimals(amount){
        return this.converter.toDecimals(amount,this.getDecimals());
    }

    fromDecimals(amount){
        return this.converter.fromDecimals(amount,this.getDecimals());
    }

    getDecimals(){
        return DECIMALS;
    }
}
module.exports = Erc20Lib;