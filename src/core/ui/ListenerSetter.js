class ListenerSetter{
    constructor(app) {
        this.app = app;
    }

    setEventListeners(){
        this.setSendListener();
        this.setChangeCurrencyListener();
    }
    setSendListener(){
        document.getElementById("send_button").addEventListener("click",(event)=>{
            let to = document.getElementById("send_receiver").value;
            let amount = document.getElementById("send_amount").value;
            console.log("setSendListener inner",to,amount);
            this.app.sendCurrency(to,amount).then((result)=>{
                alert(result);
            })
        })
    }

    setChangeCurrencyListener(){
        console.log('change currency');
    }
}

module.exports = ListenerSetter;