const CURRENCY = "ETH";
const ERC20 = "ERC20";
let address = "0x7C3c5cCa912eC4b6609fC5F96dab3bc270440d2f";
let balance = "0.00";
class Application{

    changeCurrency(){

    }

    getCurrency(){
        return CURRENCY;
    }

    getBalance(){
        return balance;
    }

    getAddress(){
        return address;
    }

    sendCurrency(){
        let receiver = document.getElementById("send_receiver").value;
        let amount = document.getElementById("send_amount").value;
        let currency = this.getCurrency();
        alert("Sending "+amount+" "+currency+" to "+receiver);
    }

    renderUi(){
        this.renderCurrency();
        this.renderBalance();
        this.renderAddress()
    }

    renderCurrency(){
        let elements = document.getElementsByClassName("currency_symbol");
        for(let i=0; i<elements.length;i++){
            let element = elements[i];
            element.innerHTML = this.getCurrency();
        }
    }

    renderBalance(){
        let element = document.getElementById("balance_text");
        element.innerHTML=this.getBalance();
    }

    renderAddress(){
        let element = document.getElementById("address_text");
        element.innerHTML=this.getAddress();
        //this.renderQrCode();
    }

    setEventListeners(){
        this.setSendListener();
    }
    setSendListener(){
        document.getElementById("send_button").addEventListener("click",(event)=>{
            this.sendCurrency();
        })
    }

    testWeb3(){
        console.log(web3);
    }

    // renderQrCode(){
    //     var qrcode = new QRCode("qrcode");
    //     function makeCode () {
    //         var elText = document.getElementById("address_text");
    //         console.log(elText)
    //         qrcode.makeCode(elText.innerText);
    //     }
    //
    //     makeCode();
    //
    //     $("#text").
    //     on("blur", function () {
    //         makeCode();
    //     }).
    //     on("keydown", function (e) {
    //         if (e.keyCode == 13) {
    //             makeCode();
    //         }
    //     });
    // }
}

let app = new Application();
app.renderUi();
app.setEventListeners()