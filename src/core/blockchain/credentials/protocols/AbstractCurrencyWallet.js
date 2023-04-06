class AbstractCurrencyWallet{
    provideAddress(){
        return new Promise(async(resolve,reject)=>{
            try{
                throw "provideAddress() is not implemented";
            }catch (e){
                return reject(e);
            }
        })

    }

    providePrivateKey(){
        return new Promise(async(resolve,reject)=>{
            try{
                throw "providePrivateKey() is not implemented";
            }catch (e){
                return reject(e);
            }
        })
    }
}

module.exports=AbstractCurrencyWallet;