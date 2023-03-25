class Renderer{
    constructor(app) {
        this.app = app;
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
            element.innerHTML = this.app.getCurrency();
        }
    }

    renderBalance(){
        let element = document.getElementById("balance_text");
        this.app.getBalance().then((balance)=>{
            element.innerHTML=balance;
        });
    }

    renderAddress(){
        let element = document.getElementById("address_text");
        this.app.getAddress().then((address)=>{
            element.innerHTML=address;
        })
        //this.renderQrCode();
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

module.exports = Renderer;

