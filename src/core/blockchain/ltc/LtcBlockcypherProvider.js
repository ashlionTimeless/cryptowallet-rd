const BtcBlockcypherProvider = require('/src/core/blockchain/btc/BlockcypherProvider');
//const PROVIDER_URL=process.env.LTC_PROVIDER_URL;
const PROVIDER_URL="https://api.blockcypher.com/v1/ltc";
const NETWORK = 'main';

class LtcBlockcypherProvider extends BtcBlockcypherProvider{
    _getProviderUrl(){
        return PROVIDER_URL;
    }
    _getNetworkUrl(){
        return NETWORK;
    }
}

module.exports = LtcBlockcypherProvider;