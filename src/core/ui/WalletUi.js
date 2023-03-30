const Renderer = require("./Renderer");
const ListenerSetter = require("./ListenerSetter");

class WalletUi{
    constructor(app) {
        this.app = app;
        this.renderer = new Renderer(app);
        this.listenerSetter = new ListenerSetter(app);
        this.listenerSetter.setEventListeners();
    }

    prepareInterface(){
        this.renderer.renderUi();
    }
}

module.exports = WalletUi;