const BTCAPIPROVIDER="https://api.blockcypher.com/v1/btc";
const NETWORK = 'test3';
const API_TOKEN=process.env.BLOCKCYPHER_API_TOKEN;
const SEND="SEND";
const BALANCE="BALANCE";
const FEE = "FEE";
const GET_UTXO="GET_UTXO";
const PROBLEM_WITH_NODE = "PROBLEM_WITH_NODE";
const WRONG_FEE = "WRONG FEE";
const TXSIZE = 0.512;//512 bytes

class BlockcypherProvider{
    constructor(app,validator,converter) {
        this.httpService = app.httpService;
        this.validator = validator;
        this.converter = converter;
    }


    urlCompose(action,parameters){
        let base = `${BTCAPIPROVIDER}/${NETWORK}`;
        let relativeUrl=''
        switch (action){
            case BALANCE:
                this.validator.validateObject(parameters,"urlCompose.parameters");
                var address = parameters["address"];
                this.validator.validateAddress(address);
                relativeUrl = `/addrs/${address}/balance?1`;
                break;
            case SEND:
                relativeUrl= `/txs/push?1`;
                break;
            case FEE:
                relativeUrl = `?1`;
                break;
            case GET_UTXO:
                this.validator.validateObject(parameters,"urlCompose.parameters");
                var address = parameters["address"];
                this.validator.validateAddress(address);
                relativeUrl = `/addrs/${address}?unspentOnly=true`;
                break;
        }
        let url = `${base}${relativeUrl}&token=${API_TOKEN}`;
        console.log(action,url);
        return url;
    }
    getBalance(address){
        return new Promise(async(resolve,reject)=>{
            try{
                let url = this.urlCompose(BALANCE,{"address":address});
                let result = await this.getRequest(url);
                console.log("getBalance result",result);
                console.log("getBalance result 2",result);

                console.log("getBalance result typeof",typeof result);

                let balance = result["final_balance"];
                console.log("getBalance balance",balance);
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }

    getFee(){
        return new Promise(async(resolve,reject)=>{
            try{
                let url = this.urlCompose(FEE);
                console.log("getFee url",url)
                let result = await this.getRequest(url);
                console.log("getFee getResult result",result)
                //let slow = TXSIZE*this.converter.toDecimals(result.low_fee_per_kb);
                let medium = TXSIZE*this.converter.toDecimals(result.medium_fee_per_kb);
                console.log("getFee medium",medium)
                return resolve(medium);
            }catch(e){
                return reject(e)
            }
        })
    }

    addSignedUtxos(keyring,txb,from,to,amount,fee){
        return new Promise(async(resolve,reject)=>{
            try{
                console.log("addSignedUtxos",keyring,txb,from,to,amount,fee);
                this.validator.validateObject(keyring,"keyring");
                this.validator.validateObject(txb,"txb");
                let utxoData = await this.getUtxos(from, amount, fee);
                console.log("addSignedUtxos after utxoData",utxoData);
                if(utxoData !== WRONG_FEE) {
                    let utxos = utxoData.outputs;
                    let change = utxoData.change;
                    console.log("addSignedUtxos before loop");
                    for (let key in utxos) {
                        console.log("addSignedUtxos adding input ",utxos[key].txid, utxos[key].vout);
                        txb.addInput(utxos[key].txid, utxos[key].vout);
                    }
                    console.log("addSignedUtxos after loop",txb);
                    console.log("addSignedUtxos before adding to",to,amount);
                    txb.addOutput(to, amount);
                    console.log("addSignedUtxos before adding from",from,change);
                    txb.addOutput(from, change);
                    let i = 0;
                    console.log("addSignedUtxos before signing to")
                    for (let key in utxos) {
                        txb.sign(i, keyring)
                        i++;
                    }
                    console.log("addSignedUtxos end txb",txb);
                    return resolve(txb);
                }
            }catch (e){
                return reject(e);
            }
        })
    }

    getUtxos(address,amount,fee){
        return new Promise(async(resolve,reject)=>{
            try{
                this.validator.validateAddress(address);
                this.validator.validateNumber(amount);
                this.validator.validateNumber(fee);

                let balance = await this.getBalance(address);
                if(balance >= amount+fee){
                    console.log("BCPHProvider before listUnspent",address)
                    let allUtxo = await this.listUnspent(address);
                    console.log("BCPHProvider after listUnspent",allUtxo)
                    let tmpSum = 0;
                    let requiredUtxo = [];
                    for(let key in allUtxo){
                        if(tmpSum<=amount+fee){
                            tmpSum+=allUtxo[key].value;
                            requiredUtxo.push({
                                txid:allUtxo[key].tx_hash,
                                vout:allUtxo[key].tx_output_n
                            })
                        }else{
                            break;
                        }
                    }
                    let change = tmpSum - amount - fee;
                    this.validator.validateNumber(change);
                    let utxos = {
                        "change":change,
                        "outputs":requiredUtxo
                    };
                    console.log("getUtxo calculated",utxos);
                    return resolve(utxos);
                }else{
                    amount = this.converter.toDecimals(amount)
                    fee = this.converter.toDecimals(fee)
                    balance = this.converter.toDecimals(balance)
                    console.log("Insufficient balance: trying to send "+amount+" BTC + "+fee+" BTC fee when having "+balance+" BTC")
                    return resolve(WRONG_FEE)
                }
            }catch(e){
                return reject(e);
            }
        });
    }

    listUnspent(address){
        return new Promise(async(resolve,reject)=>{
            try{
                console.log("BlockcypherProvider listUnspent start",address)
                this.validator.validateAddress(address);
                console.log("BlockcypherProvider listUnspent before urlCompose",address);
                let url = this.urlCompose(GET_UTXO,{address:address});
                console.log("BlockcypherProvider listUnspent url",url);
                let data = await this.getRequest(url)
                console.log("BlockcypherProvider listUnspent data",data);
                let unspents = data.txrefs;
                console.log("BlockcypherProvider listUnspent after",unspents)
                return resolve(unspents);
            }catch(e){
                return reject(e);
            }
        })
    }

    sendTx(rawTx){
        return new Promise(async(resolve,reject)=>{
            try{
                console.log('sendTx',rawTx);
                this.validator.validateString(rawTx, "rawTx");
                let url = this.urlCompose(SEND);
                let body= JSON.stringify({"tx": rawTx});
                let result=await this.postRequest(url, body);
                console.log("sendTx result",result);
                return resolve(result.tx.hash);
            }catch (e) {
                return reject(e)
            }
        })
    }
    getRequest(url){
        return new Promise(async(resolve,reject)=>{
            try{
                console.log('getRequest start')
                let response = null;
                try{

                    response = await this.httpService.getRequest(url);
                    console.log('getRequest after response',response)
                }catch (e){
                    console.log('getRequest after response',response)
                    throw PROBLEM_WITH_NODE;
                }
                console.log("getRequest response",response)
                let result = await response.json();
                console.log("getRequest result",result)
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }

    postRequest(url,body){
        return new Promise(async(resolve,reject)=>{
            try{
                let response = null;
                try{
                    response = await this.httpService.postRequest(url,body);
                }catch (e){
                    return resolve(PROBLEM_WITH_NODE)
                }

                let result = await response.json();
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }
}

module.exports = BlockcypherProvider;