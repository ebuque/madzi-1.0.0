import { observable, action } from "mobx";

class Loja {
    @observable user = ""
    @observable email = ""
    @observable accessToken=""
    @observable apiHost = "http://41.223.152.98:8077"
    @observable simulateEndPoint = "/fipagmaputo/api/recharge/simulate"
    @observable rechargeEndPoint = "/fipagmaputo/api/recharge/generate"
    @observable eld = "PLUS_TEK"
    @observable eKey = "e2d25046-1cee-4ac8-b917-6879c2f30b36"
    @observable eKeyMpesa = "3667d86e-075e-4c0c-a75d-7135591b8bf2"
    @observable userId = "ptekid"
    @observable sessionId = "c3c7e6c7-286d-4119-8dff-4e833e275544"
    @observable token = "4CDC9902-ED7A-4B1C-9CFB-DDD50F3B32C1"
    @observable customerName = ""
    @observable meterNumber = ""
    @observable customerAddress =""
    @observable neighborhood = ""
    @observable paymentAmount = ""
    @observable simulationId = ""
    @observable scale = ""
    @observable transactionId = ""
    @observable msisdn = ""
    @observable category = ""
    @observable rechargeCode = ""
    @observable vat = ""
    @observable waterAmount =""
    @observable debtAmount = ""
    @observable availabilityService = ""
    @observable waterVolume =""
    @observable dataehora = ""
    @observable mpesaApiEndpoint = "http://41.223.152.98:8077/mpesa/auth/transaction"
   
    
    @action addValue = (type, item)  => {
        switch (type) {
            case 'email':
                this.email = item;
                break;
            case 'dataehora':
                this.dataehora = item;
                break;
           case 'debtAmount':
               this.debtAmount = item;
               break;
           case 'accessToken':
               this.accessToken = item;
               break;
            case 'neighborhood':
                this.neighborhood = item;
                break;
           case 'availabilityService':
               this.availabilityService = item;
               break;
                case 'scale':
                    this.scale = item;
                    break;
                    case 'category':
                        this.category = item;
                        break;
            case 'vat':
                    this.vat = item;
                    break;

            case 'waterAmount':
                this.waterAmount = item;
                break;
            case 'waterVolume':
                this.waterVolume = item;
                break;
            case 'fullname':
                this.user = item;
                break;
            case 'rechargeCode':
               this.rechargeCode = item;
               break;
            case 'simulationId':
                this.simulationId= item;
                break;
            case 'transactionId':
                this.transactionId = item;
                break;
            case 'customerName':
            this.customerName = item;
            break;
            case 'meterNumber':
            this.meterNumber = item;
            break;
            case 'sisdn':
            this.sisdn = item;
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