const bip39 = require('bip39');

class MnemonicGenerator {
    generateMnemonic(){
        return bip39.generateMnemonic();
    }
}

module.exports = MnemonicGenerator;