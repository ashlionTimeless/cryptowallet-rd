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
        let elements = document.getElementsByClassName("currency-select" );
        for(let i=0;i<elements.length;i++){
            elements[i].addEventListener("click",(event)=>{
                let el = event.target;
                console.log(el);
                let currency = el.getAttribute("data-value")
                console.log("data-value=",currency);
                this.app.changeCurrency(currency);
                console.log(event);
            })
        }
        console.log('change currency');
    }
}

module.exports = ListenerSetter;