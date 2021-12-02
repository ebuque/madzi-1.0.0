import { observable, action } from "mobx";

class Loja {
    @observable user = ""
    @observable email = ""
    @observable apiHost = "http://41.223.152.98:8077"
    @observable simulateEndPoint = "/fipagmaputo/api/recharge/simulate"
    @observable eld = "PLUS_TEK"
    @observable eKey = "e2d25046-1cee-4ac8-b917-6879c2f30b36"
    @observable userId = "ptekid"
    @observable sessionId = "c3c7e6c7-286d-4119-8dff-4e833e275544"
    @observable token = "63BDAAAC-EC5C-4C38-AC76-8397F46343DA"
    @observable customerName = ""
    @observable meterNumber = ""
    @observable customerAddress =""
    @observable paymentAmount = ""
    @observable mpesaApiEndpoint = "http://41.223.152.98:8077/mpesa/auth/transaction"
   
    
    @action addValue = (type, item)  => {
        switch (type) {
            case 'email':
                this.email = item;
                break;
            case 'fullname':
                this.user = item;
                break;
            case 'customerName':
            this.customerName = item;
            break;
            case 'meterNumber':
            this.meterNumber = item;
            break;
            case 'customerAddress':
            this.customerAddress = item;
            break;
            case 'paymentAmount':
            this.paymentAmount = item;
            break;
            default:
                break;
        }
        
          return item;
        
      }
}

store = window.store = new Loja();
export default store;