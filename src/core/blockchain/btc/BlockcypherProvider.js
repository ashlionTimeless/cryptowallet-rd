class BlockcypherProvider{
    constructor() {
    }
    getBalance(address){
        return new Promise(async(resolve,reject)=>{
            try{
                // https://api.blockcypher.com/v1/btc/test3/addrs/n4Lp68hV5ykgXLGH56iWvwKJNrbY59fu6G/balance
                let url = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`;
                let data = null;
                let method = "GET";
                let result = await this.getRequest(url,data,method);
                console.log("getBalance result",result);
                result = await result.json();
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

    getRequest(url,data,method,headers){
        return new Promise(async(resolve,reject)=>{
            if(!headers){
                headers = {"Content-Type": "application/json"};
            }
            const options={
                body: data,
                method: method,
                headers: headers
            };
            fetch(url, options).then((res) => {
                return resolve(res);
            }).catch(e => {
                return reject(e)
            });
        })
    }
}

module.exports = BlockcypherProvider;